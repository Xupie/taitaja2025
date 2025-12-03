"use client";

import Button_Primary, { Button_Delete, Button_Edit, Button_Secondary } from "@/components/buttons";
import NewQuestion from "@/components/question/newQuestion";
import UpdateQuestion from "@/components/question/updateQuestion";
import { useRouter } from "next/navigation";
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
    const router = useRouter();

    const [questionData, setQuestionData] = useState<questionDataType | null>(null);
    const [newQuestionVisible, setNewQuestionVisible] = useState(false);
    const [updateQuestionVisible, setUpdateQuestionVisible] = useState(false);
    const [selectedQuestion, setSelectedQuestion] = useState<null | number>(null);
    const [loading, setLoading] = useState(true);

    const onClickNewQuestion = () => {
        setNewQuestionVisible(!newQuestionVisible);
    }

    const onClickUpdateQuestion = () => {
        setUpdateQuestionVisible(!updateQuestionVisible);
    }

    useEffect(() => {
        async function getCategoryData() {
            const response = await fetch(`http://localhost:8080/api/game.php?action=get_questions&id=${id}`, {
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

        const response = await fetch(`http://localhost:8080/api/admin.php?action=add_question`, {
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
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
        else {
            alert("Virhe luodessa kysymystä");
        }

    }

    async function deleteQuestion(question_id: number) {
        const response = await fetch(`http://localhost:8080/api/admin.php?action=delete_question`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    question_id: question_id,
                },
            ),
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            setQuestionData(prev => prev ? {
                ...prev,
                questions: prev.questions.filter((_, i) => i !== question_id)
            } : null);
        }
    }

    async function updateQuestion() {
        const question = (document.querySelector("input[name=question]") as HTMLInputElement).value;
        const a = (document.querySelector("input[name=a]") as HTMLInputElement).value;
        const b = (document.querySelector("input[name=b]") as HTMLInputElement).value;
        const c = (document.querySelector("input[name=c]") as HTMLInputElement).value;
        const d = (document.querySelector("input[name=d]") as HTMLInputElement).value;
        const correct = (document.querySelector("input[name=correct]:checked") as HTMLInputElement).id;

        const response = await fetch(`http://localhost:8080/api/admin.php?action=update_question`, {
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
                    id: parseInt(id),
                },
            ),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
        }
        else {
            alert("Virhe päivittäessä kysymystä");
        }
    }

    if (loading) return <p>Loading...</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-gray-50 rounded-xl md:shadow-lg flex flex-col gap-6">
            <h1 className="text-3xl text-center font-bold mb-2">Muokkaa kategoriaa</h1>

            {questionData && questionData.questions.map((question, index) => (
                <div key={index} className="border-b border-gray-300 pb-4 flex">
                    <h2 className="font-semibold mb-2">Kysymys {index + 1}: {question.question}</h2>
                    <div className="ms-auto flex gap-4">
                        <Button_Edit size="2.5rem" onClick={() => {
                            setSelectedQuestion(index);
                            onClickUpdateQuestion();
                        }} />
                        <Button_Delete size="2.5rem" onClick={() => deleteQuestion(index)} />
                    </div>

                </div>
            ))}

            <div className="flex justify-between gap-4">
                <Button_Secondary
                    height="3rem"
                    text="Takaisin"
                    width="10rem"
                    onClick={() => router.push(`/admin`)}
                />
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
            {updateQuestionVisible && selectedQuestion !== null && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <UpdateQuestion questionData={questionData?.questions?.[selectedQuestion]} updateQuestion={updateQuestion} cancel={() => setUpdateQuestionVisible(false)} />
                </div>
            )}
        </div>
    )
}