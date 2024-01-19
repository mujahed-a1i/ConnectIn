class Api::PostsController < ApplicationController
  def create
    @post = Post.new(description: params[:description])
    @post.user_id = current_user.id
    if @post.save
      render :show
    else
      render json: {errors: @user.errors.full_messages}  , status: 422
    end
  end

  def index
    # if params[:user_id]
    #   @posts = Post.where(user_id: params[:user_id])
    #   render :index
    # else 
      @posts = Post.all
      render :index
    # end    
  end

  def show
    @post = Post.find(params[:id])
    if @post 
      render :show
    else
      render json: {errors: @user.errors.full_messages}  , status: 404
    end
  end

  def update
    @post = Post.find(params[:id])
    if @post.update(post_params)
      render :show
    else 
      render json: {errors: @user.errors.full_messages}  , status: 422
    end
  end

  def destroy
    @post = Post.find(params[:id])
    if @post.destroy
       render :index
    else
      render plain: "Post cant be deleted"
    end
  end

  private
    def post_params
        params.require(:user).permit(:description, :user_id)
    end
end
