import { useRoute } from "@react-navigation/native";
import { Reply, Thread } from "../types/threads";
import ThreadItem from "../components/ThreadItem";
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import ReplyItem from "../components/ReplyItem";
import { useState } from "react";
import { createRandomFollower } from "../utils/generate-dommy-data";

export default function ThreadDetails(): JSX.Element {
  const route = useRoute();
  const [thread, setThread] = useState(route.params as Thread);
  const [replyContent, setReplyContent] = useState("");

  function handleReply() {
    const newReply: Reply = {
      author: createRandomFollower(),
      content: replyContent,
      createdAt: new Date().toISOString(),
      id: Math.random().toString(),
      likes: 0,
    };
    setThread((prevState) => ({
      ...prevState,
      replies: [newReply, ...prevState.replies!],
      repliesCount: prevState.repliesCount + 1,
    }));
    setReplyContent("");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ padding: 10 }}>
        <ThreadItem thread={thread} />

        <View style={{ gap: 15 }}>
          {thread.replies?.map((reply) => (
            <ReplyItem key={reply.id} {...reply} />
          ))}
        </View>
      </ScrollView>
      <View style={styles.replyContainer}>
        <TextInput
          placeholder="Add reply"
          value={replyContent}
          onChangeText={setReplyContent}
          style={styles.input}
        />
        <View style={styles.btn}>
          <Button
            title="Reply"
            disabled={!replyContent}
            onPress={handleReply}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    backgroundColor: "#00000010",
    marginLeft: 10,
    padding: 10,
    marginBottom: 30,
    borderRadius: 10,
    color: "white",
    maxWidth: 280,
  },
  btn: {},
  replyContainer: {
    flexDirection: "row",
    padding: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
