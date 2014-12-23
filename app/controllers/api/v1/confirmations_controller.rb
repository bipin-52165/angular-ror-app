class Api::V1::ConfirmationsController < Devise::ConfirmationsController
  protect_from_forgery with: :null_session, :if => Proc.new { |c| c.request.format == 'application/vnd.angularjsapp.v1' }
  before_filter :authenticate_user!, :except => [:show]

  def create
    if !current_user.confirmed?
      @user = User.send_confirmation_instructions({email: current_user.email})
      if successfully_sent?(@user)
        render :json => nil, :status => 200
      else
        render :json => {:error => 'There was an error in sending the confirmation email'}, :status => 500
      end
    else
      render :json => {:error => 'User is already confirmed'}, :status => 401
    end
  end

  def show
    @user = User.confirm_by_token(params[:confirmation_token])
    if @user.errors.empty?
      sign_in(@user)
      render :json => {:confirmed => current_user.confirmed?}, :status => 200
    else
      render :json => {:error => @user.errors.full_messages}, :status => 401
    end
  end
end