class Api::PostsController < ApplicationController
  def create
    @post = Post.new(post_params)

    if @post.save!
      render :show
    else
      render json: {errors: @user.errors.full_messages}  , status: 422
    end
  end

  # def index
  #   @posts = Post.all
  #   render :index
  # end

  # def show
  #   @post = Tea.find_by(id: params[:id])
  #   render :show
  # end

  # def update
    
  # end

  # def destroy
  # end

  private
    def post_params
        params.require(:post).permit(:description, :user_id)
    end
end
