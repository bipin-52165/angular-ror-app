class Api::V1::PasswordsController < Devise::PasswordsController

  def create
    @user = User.send_reset_password_instructions(params[:user])
    if successfully_sent?(@user)
      render :json => nil, :status => 200
    else
      render :json => {:error => 'There was an error in sending password reset email'}, :status => 401
    end
  end

  def update
    @user = User.reset_password_by_token(params[:user])
    if @user.errors.empty?
      sign_in(@user)
      render :json => {:reset => true}, :status => 200
    else
      render :json => {:error => @user.errors.full_messages}, :status => 401
    end
  end

  def update_password
    @user = current_user
    if @user.update_with_password(user_params)
      sign_in @user, :bypass => true
      render :json => nil, :status => 200
    else
      render :json => {:errors => @user.errors}, :status => 401
    end
  end

  def user_params
    params.require(:user).permit(:password, :password_confirmation, :current_password)
  end
end