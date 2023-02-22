package com.example.musicbackend.services;

import com.example.musicbackend.models.Message;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.hibernate.validator.internal.util.logging.Messages;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class MessageServices {
    public void sendMessage(String id, String myMessage) throws ExecutionException, InterruptedException {

        ArrayList<Messages> list = new ArrayList<>();

        //database connection object
        Firestore db = FirestoreClient.getFirestore();

        //Allows us to make an async call to the database
        DocumentReference ref = db.collection("Messages").document(id);
        // future.get() blocks on response

        ref.update("messages", FieldValue.arrayUnion(myMessage));

    }

}
