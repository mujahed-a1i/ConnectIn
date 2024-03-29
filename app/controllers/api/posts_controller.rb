class Api::PostsController < ApplicationController
  before_action :require_logged_in, only: [:create]
  before_action :require_logged_in, only: [:destroy]  
  wrap_parameters include: Post.attribute_names + [:description, :photo]

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    @user = current_user

    if @post.save
      render :show
    else
      render json: {errors: @post.errors.full_messages}  , status: 422
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
    @user = User.find(@post.user_id)
    if @post 
      render :show
    else
      render json: {errors: @post.errors.full_messages}  , status: 404
    end
  end

  def update
    @post = Post.find(params[:id])
    @post.user_id = current_user.id
    @user = current_user

    if @post.update(post_params)
      render :show
    else 
      render json: {errors: @user.errors.full_messages}  , status: 422
    end
  end

  def destroy
    @post = Post.find(params[:id])
  
    if @post.destroy
      @posts = Post.all
       render :index
    else
      render plain: "Post cant be deleted"
    end
  end

  private
    def post_params
        params.require(:post).permit(:description, :photo)
    end
end
