package hattabi.youness.customer_service.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RefreshScope
public class ConfigTestController {

    @Value("${customer.params.x}")
    private int x;

    @Value("${customer.params.y}")
    private int y;

    private final CustomerConfigParams params;

    public ConfigTestController(CustomerConfigParams params) {
        this.params = params;
    }

    @GetMapping("/config")
    public Map<String, Object> getConfig() {
        return Map.of("x", x, "y", y, "params", params);
    }
}