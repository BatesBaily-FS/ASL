FROM ruby:3.3
RUN bundle config --global frozen 1
WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle lock --add-platform aarch64-linux
RUN bundle install
COPY . .
CMD ["ruby", "app.rb"]
