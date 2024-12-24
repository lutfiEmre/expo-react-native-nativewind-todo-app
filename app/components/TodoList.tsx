// components/TodoList.tsx
import React from "react";
import { View, Text, FlatList } from "react-native";
import TodoItem from "./TodoItem";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoListProps {
    data: Todo[];
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ data, onToggle, onDelete }) => {
    return (
        <FlatList
            className="flex-1 mt-4 px-4"
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <TodoItem item={item} onToggle={onToggle} onDelete={onDelete} />
            )}
            ListEmptyComponent={() => (
                <View className="items-center mt-10">
                    <Text className="text-gray-500">Görev bulunamadı.</Text>
                </View>
            )}
        />
    );
};

export default TodoList;
