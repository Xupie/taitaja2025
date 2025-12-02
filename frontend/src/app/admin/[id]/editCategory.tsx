"use client";

import Button_Primary, { Button_Cancel, Button_Delete, Button_Edit } from "@/components/buttons";
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
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        }

        getCategoryData();
    }, [id]);

    async function addQuestion() {
        const question = (document.querySelector("input[name=question]") as HTMLInputElement).value;
        const a = (document.querySelector("input[name=a]") as HTMLInputElement).value;
        const b = (document.querySelector("input[name=b]") as HTMLInputElement).value;
        const c = (document.querySelector("input[name=c]") as HTMLInputElement).value;
        const d = (document.querySelector("input[name=d]") as HTMLInputElement).value;
        const correct = (document.querySelector("input[name=correct]:checked") as HTMLInputElement).id;

        const response = await fetch(`http://localhost:8080/backend/admin.php?action=add_question`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    question: question,
                    a: a,
                    b: b,
                    c: c,
                    d: d,
                    correct: correct,
                    category: id,
                },
            ),
        });
        const data = await response.json();
        console.log(data);
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl shadow-lg flex flex-col gap-6">

            {questionData && questionData.questions.map((question, index) => (
                <div key={index} className="border-b border-gray-300 pb-4 flex">
                    <h2 className="font-semibold mb-2">Kysymys {index + 1}: {question.question}</h2>
                    <div className="ms-auto flex gap-4">
                        <Button_Edit size="2.5rem" onClick={() => null} />
                        <Button_Delete size="2.5rem" onClick={() => null} />
                    </div>

                </div>
            ))}

            <div className="flex justify-start">
                <Button_Primary
                    height="3rem"
                    text="Uusi kysymys"
                    width="10rem"
                    onClick={onClickNewQuestion}
                />
            </div>

            {newQuestionVisible && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <NewQuestion addQuestion={addQuestion} cancel={onClickNewQuestion} />
                </div>
            )}
        </div>
    )

}