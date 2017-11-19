class SaveRecipeController < ApplicationController
    def return_saved_recipes
        token = params[:token]
        decoded_token = JWT.decode token, nil, false
        id = decoded_token[0]["id"]
        if id
            @recipe = Recipe.where(:user_id => id)
            render json: @recipe
        end
    end
    def save_recipe
        user = params[:user]
        email = user[:user][:email]
        @user = User.where(:email => email).first
        @recipe = Recipe.new(params.require(:recipe).permit(:title, :recipe_id, :image))
        if @user.recipes << @recipe
            render json: @recipe
        else
            render json: @recipe, :status => :bad_request
        end
    end

    private 
    def user_params
        params.require(:user).permit(:email, :id)
    end
end
