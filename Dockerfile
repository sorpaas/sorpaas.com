FROM binaryphile/ruby:2.0.0-p247
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN mkdir /web
WORKDIR /web
ADD Gemfile /web/Gemfile
RUN bundle install
ADD . /web
