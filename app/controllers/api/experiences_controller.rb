class Api::ExperiencesController < ApplicationController
  wrap_parameters include: Experience.attribute_names + ['title', 'companyName', 'industry', 'location', 'description', 'startDate', 'endDate']

  def create
    @experience = Experience.new(experience_params)
    @experience.user_id = current_user.id
    @user = current_user
    if @experience.save
      render 'api/users/show'
    else
      render json: {errors: @experience.errors.full_messages}, status: 422
    end
  end

  def destroy
    @experience = Experience.find(params[:id])
  
    if @experience.destroy
      @user = current_user
      render 'api/users/show'
    else
      render plain: "Experience cant be deleted"
    end
  end
  def experience_params 
    params.require(:experience).permit(:title, :company_name, :industry, :location, :description, :start_date, :end_date)
  end
end
