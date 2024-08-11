FROM php:8.2-cli
COPY . /app/php-assignment
RUN echo "Hello ASL! The date is $(date +"%Y-%m-%d")." > /var/www/html/index.php
WORKDIR /var/www/html
CMD ["php", "-S", "0.0.0.0:8000" ]
