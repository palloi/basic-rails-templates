class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_filter :init

  def init
    @siteconfig = {
      title: "Basic Rails Template",
      description: "palloi has 5 repositories written in JavaScript, CSS, and Ruby. Follow their code on GitHub.",
      keywords: "rails, css, javascript, ajax, animation, animate, transition, transform",
      image_url: "https://avatars3.githubusercontent.com/u/2481219?v=3&amp;s=400",
      favicon_url: "https://avatars3.githubusercontent.com/u/2481219?v=3&amp;s=400",
      shared_url: "https://github.com/palloi"
    }
  end

  def ajax_request?
    request.env['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' || params[".ajax"]
  end
end
