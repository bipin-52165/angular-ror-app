class Api::V1::UsersController < Api::V1::BaseController
  before_filter :authenticate_user!, :except => [:create, :show]

  def show
    if current_user
      render :json => {:info => "Current User", :user => current_user, :confirmed => current_user.confirmed?}, :status => 200
    else
      render :json => {}, :status => 401
    end
  end

  def create
    @user = User.new(user_params)
    @user.skip_confirmation!
    if @user.save
      sign_in(@user)
      respond_with @user, :location => api_users_path
    else
      respond_with @user.errors, :location => api_users_path
    end
  end

  def update
    @user = User.update(current_user.id, user_params)
    if @user.valid?
      respond_with :api, @user
    else
      render :json => {:errors => @user.errors}, :status => 401
    end
  end

  def destroy
    respond_with :api, User.find(current_user.id).destroy
  end

  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
