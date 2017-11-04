class AccessController < ApplicationController
  # before_action :confirm_logged_in, :except => [:login, :attempt_login, :log_out ]
  def menu
    # display admin index
  end

  def login
    # display login form
    puts 'login form'
  end

  def attempt_signup
    if params[:email].present? && params[:password].present?
      user = User.new(:email => params[:email])
      user.email = params[:email]
      user.password = params[:password]
      user.save
      render json: {status: 'success'}
    end
  end

  def attempt_login
    if params[:email].present? && params[:password].present?
      found_user = User.where(:email => params[:email]).first
      if found_user
        authorized_user = found_user.authenticate(params[:password])
      end
    end

    if authorized_user
      payload = {id: authorized_user.id, email: authorized_user.email}
      token = JWT.encode payload, nil, 'none'
      render json: {token: token, user: {id: authorized_user.id, email: authorized_user.email}}
    else
      render json: {errors: ['Invalid Username/Password']}, status: :unauthorized
    end
  end

  def log_out
    session[:user_id] = nil
    redirect_to('/')
  end
  
  private

  def authentication_payload(user)
    return nil unless user && user.id
    {
      auth_token: AuthToken.encode({ user_id: id }),
      user: { id: user.id, username: user.username } # return whatever user info you need
    }
  end

  def user_params
    params.require(:email, :password).permit(:email, :password)
  end

end
