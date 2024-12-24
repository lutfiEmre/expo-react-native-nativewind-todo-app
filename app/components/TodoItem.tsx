// components/TodoItem.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

interface TodoItemProps {
    item: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ item, onToggle, onDelete }) => {
    return (
        <View className="flex-row items-center justify-between px-4 py-2 my-1 bg-gray-100 rounded-md">
            <TouchableOpacity
                onPress={() => onToggle(item.id)}
                className="flex-row items-center flex-1"
            >
                <Text
                    className={
                        item.completed
                            ? "text-green-600 text-base line-through"
                            : "text-black text-base"
                    }
                >
                    {item.title}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                className="px-3 py-1 bg-red-500 rounded-lg"
                onPress={() => onDelete(item.id)}
            >
                <Text className="text-white">Sil</Text>
            </TouchableOpacity>
        </View>
    );
};

export default TodoItem;
