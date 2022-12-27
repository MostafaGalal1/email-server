package com.email.EmailServer;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/Email")
public class Controller {
    private final Proxy proxy;

    public Controller(Proxy proxy) { this.proxy = proxy; }

    @PostMapping("/SignUp")
    @ResponseBody
    public String SignUp(@RequestBody String data){
        return proxy.run("SignUp", new JSONObject(data));
    }

    @PostMapping("/LogIn")
    public String LogIn(@RequestBody String data){
       return proxy.run("LogIn",new JSONObject(data));
    }

}
