class Message
  include Mongoid::Document
  field :user, :type => String
  field :content, :type => String
  field :created, :type => Time
  validates_presence_of :user
  validates_presence_of :content
end
