---
sidebar_position: 5
---

# 🏥 Health Monitoring

NestFlux includes a comprehensive health monitoring system that allows you to check the status of your application and its dependencies. The health endpoint provides real-time insights into the application's operational status.

## 📊 What Does It Monitor?

The health service monitors several critical aspects of your application:

### 1. **Memory Heap**
- Monitors heap memory usage
- Threshold: 150MB
- Helps detect memory leaks and excessive memory consumption

### 2. **Memory RSS (Resident Set Size)**
- Monitors the total memory allocated for the process
- Threshold: 300MB
- Indicates overall memory footprint of the application

### 3. **Database Status**
- Checks connectivity to the main PostgreSQL database
- Validates database is accessible and responding
- Performs a simple query to verify database operations

### 4. **External Authentication Service**
- Monitors the OIDC authentication provider via HTTP
- Ensures the external auth service is reachable
- Critical for user authentication functionality

## ⚙️ Configuration

The health service can be configured through environment variables in your `.env` file.

### Enable/Disable Health Service

```bash
# Enable health monitoring endpoint
HEALTH_SERVICES_ENABLED=true

# Disable health monitoring endpoint (default)
HEALTH_SERVICES_ENABLED=false
```

When disabled, the health endpoint will not be available.

### API Key Protection

You can protect the health endpoint with API keys for additional security:

```bash
# Single API key
HEALTH_SERVICES_API_KEYS=["your-secret-api-key-here"]

# Multiple API keys
HEALTH_SERVICES_API_KEYS=["key-1", "key-2", "key-3"]

# No protection (not recommended for production)
HEALTH_SERVICES_API_KEYS=[]
```

When API keys are configured, clients must include the `x-api-key` header with a valid key to access the health endpoint.

:::warning Production Security
**It is strongly recommended to protect health information in production environments.**

Health endpoints can expose sensitive information about your infrastructure, including:
- Memory usage patterns
- Database connectivity details
- External service dependencies
- Potential attack surface for denial-of-service

Always use API key protection when enabling health checks in production. Consider these best practices:
- Use strong, randomly generated API keys
- Rotate API keys regularly
- Limit health endpoint access to monitoring tools and authorized personnel
- Monitor access logs for unauthorized attempts
- Consider using network-level restrictions (firewall, VPC) in addition to API keys
:::

## 🔌 Using the Health Endpoint

### Basic Request

```bash
# Without API key protection
GET /health

# With API key protection
GET /health
x-api-key: your-secret-api-key-here
```

### Response Format

The health endpoint returns a detailed status report:

```json
{
  "status": "ok",
  "info": {
    "memory_heap": {
      "status": "up"
    },
    "memory_rss": {
      "status": "up"
    },
    "main_database": {
      "status": "up"
    },
    "external_auth_service": {
      "status": "up"
    }
  },
  "error": {},
  "details": {
    "memory_heap": {
      "status": "up"
    },
    "memory_rss": {
      "status": "up"
    },
    "main_database": {
      "status": "up"
    },
    "external_auth_service": {
      "status": "up"
    }
  }
}
```

### Health Status Indicators

- **`ok`**: All health checks passed
- **`error`**: One or more health checks failed
- **`shutting_down`**: Application is in shutdown process

Individual component status:
- **`up`**: Component is healthy and operational
- **`down`**: Component is not responding or failed health check

## 🎯 Use Cases

### Kubernetes/Docker Health Checks

Configure your container orchestration to use the health endpoint:

```yaml
# Kubernetes example
livenessProbe:
  httpGet:
    path: /health
    port: 3001
    httpHeaders:
    - name: x-api-key
      value: your-secret-api-key
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health
    port: 3001
    httpHeaders:
    - name: x-api-key
      value: your-secret-api-key
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Monitoring and Alerting

Integrate with monitoring tools like:
- **Prometheus**: Scrape health metrics
- **Grafana**: Visualize health status
- **Datadog**: Monitor application health
- **New Relic**: Track performance and availability

### Load Balancer Health Checks

Configure your load balancer to check application health before routing traffic:

```nginx
# Nginx example
upstream backend {
  server backend1:3001;
  server backend2:3001;
  
  # Health check
  check interval=3000 rise=2 fall=5 timeout=1000 type=http;
  check_http_send "GET /health HTTP/1.0\r\nHost: localhost\r\nx-api-key: your-secret-api-key\r\n\r\n";
  check_http_expect_alive http_2xx http_3xx;
}
```

## 🔧 Customizing Health Checks

The health service is located in [apps/server/src/core/health/health.service.ts](../../../../apps/server/src/core/health/health.service.ts).

You can customize:
- Memory thresholds
- Add additional database checks
- Monitor other external services
- Add custom health indicators

Example of adding a custom health check:

```typescript
private async customServiceStatus() {
  const indicator = this.healthIndicatorService.check('custom_service');
  
  try {
    // Your custom check logic
    const isHealthy = await this.checkCustomService();
    return isHealthy ? indicator.up() : indicator.down('Service not available');
  } catch (error) {
    return indicator.down((error as Error).message);
  }
}
```

## 📚 Related Resources

- [NestJS Terminus Documentation](https://docs.nestjs.com/recipes/terminus)
- [Health Check Pattern](https://microservices.io/patterns/observability/health-check-api.html)
- [12-Factor App: Admin Processes](https://12factor.net/admin-processes)
