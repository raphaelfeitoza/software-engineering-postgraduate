Rails.application.config.middleware.insert_before 0, Rack::Cors do
    allow do
      origins 'http://localhost:3006'
      resource '*', headers: :any, methods: [:head, :get, :post]
    end
  end
