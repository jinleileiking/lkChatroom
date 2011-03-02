class AboutController < ApplicationController
  def index
    @message = Message.new
  end
end
