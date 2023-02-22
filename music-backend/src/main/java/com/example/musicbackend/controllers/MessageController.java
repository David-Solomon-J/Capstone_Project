package com.example.musicbackend.controllers;


import com.example.musicbackend.services.MessageServices;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ExecutionException;

@RequestMapping("/api/message")
@RestController
public class MessageController {

    //Creating instance of the Meessage service
    private MessageServices messageServices;

    //Creates constructor for the instance
    public MessageController(MessageServices messageServices) {
         this.messageServices = messageServices;
    }

    //Creates method and url for method
    @PostMapping("/{id}")
    public void sendMessage(@PathVariable(name="id") String uid, @RequestBody String message) throws ExecutionException, InterruptedException {
        messageServices.sendMessage(uid, message);
    }
}
