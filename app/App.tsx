// App.tsx
import React, { useEffect, useState } from "react";
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import '../index.css'


import TodoList from "./components/TodoList";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export default function App(): JSX.Element {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [text, setText] = useState("");
    const [filter, setFilter] = useState<"all" | "completed" | "active">("all");
    const [search, setSearch] = useState("");


    useEffect(() => {
        loadTodos();
    }, []);


    useEffect(() => {
        saveTodos();
    }, [todos]);

    const loadTodos = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem("@todos");
            if (jsonValue != null) {
                const parsed = JSON.parse(jsonValue) as Todo[];
                setTodos(parsed);
            }
        } catch (e) {
            console.log("Error loading todos from storage:", e);
        }
    };

    const saveTodos = async () => {
        try {
            await AsyncStorage.setItem("@todos", JSON.stringify(todos));
        } catch (e) {
            console.log("Error saving todos to storage:", e);
        }
    };


    const addTodo = () => {
        if (!text.trim()) {
            Alert.alert("Uyarı", "Lütfen bir görev yazın!");
            return;
        }
        const newTodo: Todo = {
            id: Date.now().toString(),
            title: text.trim(),
            completed: false,
        };
        setTodos((prev) => [...prev, newTodo]);
        setText("");
        Keyboard.dismiss();
    };


    const toggleTodo = (id: string) => {
        const updated = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(updated);
    };


    const deleteTodo = (id: string) => {
        const filtered = todos.filter((t) => t.id !== id);
        setTodos(filtered);
    };


    const filteredTodos = todos.filter((t) => {
        if (filter === "completed" && !t.completed) return false;
        if (filter === "active" && t.completed) return false;
        return true;
    });


    const finalList = filteredTodos.filter((t) =>
        t.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <SafeAreaView className="flex-1  bg-white">
            <View className="p-4 bg-blue-500 items-center">
                <Text className="text-white text-xl font-bold">Expo React Native - NativeWind Todo</Text>
            </View>

            <View className={"flex flex-col"}>
                <View className="px-3 pt-4 w-full gap-4 flex-row items-center">
                    <View className=" h-[40px] w-[86%] gap-4 flex-row items-center">
                        <Text className="text-black w-[40px]">Filter</Text>
                        <TextInput
                            placeholder="Ara..."
                            value={search}
                            onChangeText={(val) => setSearch(val)}
                            className="flex-1 h-full bg-gray-200 rounded-md px-3 py-2 mr-2"
                        />
                    </View>
                    <TouchableOpacity
                        className="px-3 w-[9%] flex justify-center items-center py-3 bg-gray-400 rounded-md"
                        onPress={() => setSearch("")}
                    >
                        <Text className="text-white">X</Text>
                    </TouchableOpacity>
                </View>

                <View className=" flex-col flex gap-4 items-center">
                    <View className="px-3 gap-4 h-[60px] pt-4 flex-row items-center">
                        <Text className="text-black w-[40px]">Input</Text>
                        <TextInput
                            placeholder="Yeni görev ekle"
                            value={text}
                            onChangeText={(val) => setText(val)}
                            className="flex-1 bg-gray-100 h-full rounded-md px-3 py-2 mr-2"
                        />

                    </View>
                    <View className={"mt-8 w-full px-12"}>
                        <TouchableOpacity
                            className="px-4 py-3 w-full flex justify-center items-center bg-blue-600 rounded-md"
                            onPress={addTodo}
                        >
                            <Text className="text-white font-bold">EKLE</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <View className="flex-row justify-between items-center justify-around  mt-4">
                    <TouchableOpacity
                        onPress={() => setFilter("all")}
                        className={`${filter === "all" ? "border-b-4 border-blue-600" : ""} p-4`}
                    >
                        <Text className="text-blue-600">Tümü</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setFilter("active")}
                        className={`${filter === "active" ? "border-b-4 border-blue-600" : ""} p-4`}
                    >
                        <Text className="text-blue-600">Aktif</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setFilter("completed")}
                        className={`${filter === "completed" ? "border-b-4 border-blue-600" : ""} p-4`}
                    >
                        <Text className="text-blue-600">Tamamlanmış</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* TODO LİSTE */}
            <TodoList data={finalList} onToggle={toggleTodo} onDelete={deleteTodo} />
        </SafeAreaView>
    );
}
