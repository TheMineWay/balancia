---
sidebar_position: 5
---

# 🔐 Connection Security

Securing connections is critical for protecting your NestFlux application from various threats including data interception, man-in-the-middle attacks, and unauthorized access. This guide covers security best practices for database, client, and server connections.

## 🗄️ Database Connections

### 🔒 SSL/TLS Encryption

**Database connections must always use SSL/TLS encryption** to protect sensitive data in transit. This prevents eavesdropping and ensures data integrity between your application and database server.

#### 🐳 Docker Database with SSL

NestFlux provides tools to generate a Docker database with SSL enabled. The setup process is streamlined - you only need to provide the certificate and key files.

#### ✅ Best Practices for Database Security

- **🔐 Always use SSL/TLS** in production environments
- **🔄 Rotate certificates regularly**
- **🔑 Use strong passwords** and consider certificate-based authentication
- **🚫 Restrict database access** to only necessary IP addresses
- **📊 Enable database audit logging** for security monitoring
- **🔄 Keep database software updated** with latest security patches

## 💻 Client Connections

### 🏗️ Hosting Infrastructure

For production deployments, use robust web servers like **Nginx** or **Apache** to serve your client application. These servers provide better security, performance, and reliability compared to development servers.

### 🔐 HTTPS Configuration

**HTTPS is mandatory for production applications**. It encrypts all communication between users and your application.

#### 🌐 Nginx HTTPS Setup

```nginx
server {
    listen 443 ssl http2;
    server_name your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512:ECDHE-RSA-AES256-GCM-SHA384:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
    add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';";

    # Serve client application
    location / {
        root /var/www/nestflux-client;
        try_files $uri $uri/ /index.html;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}
```

#### 🪶 Apache HTTPS Setup

```apache
<VirtualHost *:443>
    ServerName your-domain.com
    DocumentRoot /var/www/nestflux-client

    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/your/certificate.crt
    SSLCertificateKeyFile /path/to/your/private.key
    SSLProtocol all -SSLv3 -TLSv1 -TLSv1.1
    SSLCipherSuite ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384

    # Security Headers
    Header always set Strict-Transport-Security "max-age=63072000"
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
    Header always set Content-Security-Policy "default-src 'self'"

    # Handle SPA routing
    <Directory "/var/www/nestflux-client">
        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### 🛡️ Security Headers Explained

#### 🔒 Essential Security Headers

- **🔗 Strict-Transport-Security (HSTS)**: Forces browsers to use HTTPS for all future requests
- **🚫 X-Content-Type-Options**: Prevents MIME type sniffing attacks
- **🖼️ X-Frame-Options**: Protects against clickjacking attacks
- **⚡ X-XSS-Protection**: Enables browser XSS filtering
- **🔗 Referrer-Policy**: Controls how much referrer information is shared
- **🛡️ Content-Security-Policy (CSP)**: Prevents code injection attacks

#### 📋 Additional Recommendations

- **🚀 Use HTTP/2** for improved performance and security
- **🔐 Implement HSTS preloading** for enhanced security
- **📋 Enable OCSP stapling** for faster certificate validation
- **💪 Use strong SSL/TLS configurations** (TLS 1.2+ only)
- **⏱️ Implement rate limiting** to prevent abuse
- **📊 Enable access logging** for security monitoring

## 🖥️ Server Connections

For securing your NestJS server connections, you have two primary approaches:

### 🎯 Option 1: Native NestJS HTTPS

Configure HTTPS directly in your NestJS application. This can be done by setting up the `HTTPS` env var (to true) and providing certificate and key files.

#### ✅ Advantages of Native HTTPS:
- **🎯 Simple setup** for development and testing
- **🎛️ Direct control** over SSL/TLS configuration
- **🏗️ No additional infrastructure** required

#### ❌ Disadvantages:
- **⚙️ Limited SSL/TLS options** compared to dedicated web servers
- **⚖️ No built-in load balancing** or advanced features
- **💾 Resource overhead** on the application server

### 🔄 Option 2: Reverse Proxy with Nginx/Apache

Map HTTP NestJS server to HTTPS through a reverse proxy:

#### 🌐 Nginx Reverse Proxy Configuration

```nginx
upstream nestflux_server {
    server 127.0.0.1:3000;
    # Add more servers for load balancing
    # server 127.0.0.1:3001;
}

server {
    listen 443 ssl http2;
    server_name api.your-domain.com;

    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;

    # Security Headers
    add_header Strict-Transport-Security "max-age=63072000" always;
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options DENY;

    # Proxy to NestJS server
    location / {
        proxy_pass http://nestflux_server;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

#### 🪶 Apache Reverse Proxy Configuration

```apache
<VirtualHost *:443>
    ServerName api.your-domain.com

    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /path/to/your/certificate.crt
    SSLCertificateKeyFile /path/to/your/private.key

    # Security Headers
    Header always set Strict-Transport-Security "max-age=63072000"
    Header always set X-Content-Type-Options nosniff

    # Proxy Configuration
    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:3000/
    ProxyPassReverse / http://127.0.0.1:3000/
    
    # WebSocket support
    ProxyPass /socket.io/ ws://127.0.0.1:3000/socket.io/
    ProxyPassReverse /socket.io/ ws://127.0.0.1:3000/socket.io/
</VirtualHost>
```

#### ✅ Advantages of Reverse Proxy:
- **🚀 Better performance** and caching capabilities
- **⚙️ Advanced SSL/TLS configuration** options
- **⚖️ Load balancing** and high availability
- **🛡️ Better security** with dedicated web server features
- **🔄 Separation of concerns** between web server and application

## 🌟 General Security Recommendations

### 📜 Certificate Management

- **🏛️ Use certificates from trusted CAs** (Let's Encrypt, commercial CAs)
- **🔄 Implement certificate auto-renewal** to prevent expiration
- **📅 Monitor certificate expiration dates**
- **🌐 Use wildcard certificates** for multiple subdomains

### 📊 Monitoring and Logging

- **📝 Enable comprehensive logging** for all connections
- **👁️ Monitor for suspicious activity** and failed connection attempts
- **🚨 Set up alerts** for security events
- **🔍 Regularly review logs** for security analysis

### 🌐 Network Security

- **🔥 Use firewalls** to restrict access to necessary ports only
- **🔐 Implement VPN access** for administrative tasks
- **🏗️ Segregate networks** (separate database and application networks)
- **🔍 Regular security audits** and penetration testing

### 🌍 Environment-Specific Considerations

#### 🛠️ Development
- Use self-signed certificates for local development
- Ensure development databases are isolated
- Never use production credentials in development

#### 🚀 Production
- Implement all security measures described above
- Use monitoring and alerting systems
- Regular security updates and patches
- Backup and disaster recovery procedures

By following these guidelines, you'll establish a robust security foundation for all connections in your NestFlux application, protecting against common vulnerabilities and ensuring data integrity across your entire stack.
