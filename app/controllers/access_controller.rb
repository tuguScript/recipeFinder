class AccessController < ApplicationController
  before_action :confirm_logged_in, :except => [:login, :attempt_login, :log_out ]
  def menu
    # display admin index
  end

  def login
    # display login form
    puts 'login form'
  end

  def attempt_login
    if params[:email].present? && params[:password].present?
      found_user = User.where(:email => params[:email]).first
      if found_user
        authorized_user = found_user.authenticate(params[:password])
      end
    end

    if authorized_user
      session[:user_id] = authorized_user.id
      puts 'show you r logged in'
      redirect_to(user_path)
    else
      puts 'show you r not logged in '
      # show 'you r not logged in' 
      render('login')
    end
  end

  def log_out
    session[:user_id] = nil
    redirect_to('/')
  end


end
