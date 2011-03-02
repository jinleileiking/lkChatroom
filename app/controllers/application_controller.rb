#coding:utf-8
class ApplicationController < ActionController::Base
  protect_from_forgery
  USERNAME, PASSWORD = "root", "123456"

  before_filter :authenticate

  private

  def authenticate
    authenticate_or_request_with_http_basic do |username, password|
      username == USERNAME &&
        password == PASSWORD
    end
  end
end
