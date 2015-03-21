class SiteController < ApplicationController
  def index
    render :layout => false if ajax_request?
  end

  def about
    render :layout => false if ajax_request?
  end

  def contact
    render :layout => false if ajax_request?
  end
end
