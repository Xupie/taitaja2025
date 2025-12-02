"use client";

import Button_Primary from "@/components/buttons";
import NewQuestion from "@/components/newQuestion";
import { useEffect, useState } from "react";

type questionDataType = {
    correct_count: number;
    questions: {
        question: string;
        option_a: string;
        option_b: string;
        option_c: string;
        option_d: string;
    }[],
};


export default function EditCategory({ id }: { id: string }) {

    const [questionData, setQuestionData] = useState<questionDataType | null>(null);
    const [newQuestionVisible, setNewQuestionVisible] = useState(false);

    const onClickNewQuestion = () => {
        setNewQuestionVisible(!newQuestionVisible);
    }

    useEffect(() => {
        async function getCategoryData() {
            const response = await fetch(`http://localhost:8080/backend/game.php?action=get_questions&id=${id}`, {
                method: 'GET',
                credentials: 'include',
            });
            const data: questionDataType = await response.json();
            setQuestionData(data);
        }

        getCategoryData();
    }, [id]);

    async function addQuestion() {
        const response = await fetch(`http://localhost:8080/backend/admin.php?action=add_question`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    question: 'Uusi kysymys',
                    a: 'Vaihtoehto A',
                    b: 'Vaihtoehto B',
                    c: 'Vaihtoehto C',
                    d: 'Vaihtoehto D',
                    correct: "a",
                    category: id,
                },
            ),
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <div>
            <Button_Primary height="3rem" text="Uusi kysymys" width="10rem" onClick={() => onClickNewQuestion()} />
            {newQuestionVisible && <NewQuestion addQuestion={() => addQuestion()} />}
        </div>
    )

}