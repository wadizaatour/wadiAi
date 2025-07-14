import { defineStore } from "pinia";

export const useConversationStore = defineStore("conversationStore", {
  state: () => ({
    conversations: [],
    activeConversation: null, // index or id of the active conversation
  }),
  actions: {
    loadConversations() {
      const stored = localStorage.getItem("wadi_conversations");
      this.conversations = stored ? JSON.parse(stored) : [];
    },
    saveConversations() {
      localStorage.setItem(
        "wadi_conversations",
        JSON.stringify(this.conversations)
      );
    },
    startNewConversation(initialMessages = []) {
      const newConv = {
        date: new Date().toISOString(),
        messages: [...initialMessages],
        read: false,
      };
      this.conversations.push(newConv);
      this.activeConversation = this.conversations.length - 1;
      this.saveConversations();
    },
    addMessageToActive(message) {
      if (this.activeConversation === null) return;
      this.conversations[this.activeConversation].messages.push(message);
      this.saveConversations();
    },
    setActiveConversation(idx) {
      this.activeConversation = idx;
    },
    markAsRead(idx) {
      if (this.conversations[idx]) {
        this.conversations[idx].read = true;
        this.saveConversations();
      }
    },
    resetActiveConversation() {
      this.activeConversation = null;
    },
  },
});
