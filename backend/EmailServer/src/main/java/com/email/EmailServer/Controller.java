package com.email.EmailServer;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/Email")
public class Controller {
    private final Proxy proxy;

    public Controller(Proxy proxy) { this.proxy = proxy; }

    @PutMapping("/SignUp")
    @ResponseBody
    public String SignUp(@RequestBody String data){
        return proxy.run("SignUp", new JSONObject(data));
    }

    @PostMapping("/LogIn")
    @ResponseBody
    public String LogIn(@RequestBody String data){
        return proxy.run("LogIn",new JSONObject(data));
    }

    @PutMapping("/AddFolder")
    @ResponseBody
    public String AddFolder(@RequestBody String data){
        return proxy.run("AddFolder", new JSONObject(data));
    }

    @DeleteMapping("/DeleteFolder")
    @ResponseBody
    public String DeleteFolder(@RequestBody String data){
        return proxy.run("DeleteFolder",new JSONObject(data));
    }

    @PostMapping("/RenameFolder")
    @ResponseBody
    public String RenameFolder(@RequestBody String data){
        return proxy.run("RenameFolder",new JSONObject(data));
    }
}
