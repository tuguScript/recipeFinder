class AccessController < ApplicationController
  def menu
    # display admin index
  end

  def login
    # display login form
    puts 'show you r logged in'
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
  end
end
