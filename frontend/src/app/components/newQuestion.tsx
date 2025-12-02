import Button_Primary, { Button_Cancel } from "./buttons";

type newQuestionProps = {
    addQuestion: () => void;
    cancel: () => void;
}

export default function NewQuestion({ addQuestion, cancel }: newQuestionProps) {
    return (
        // Full-screen overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Modal container */}
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">
                {/* Close button (optional) */}
                {/* <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">&times;</button> */}

                {/* Question Input */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col">
                        <label htmlFor="question" className="mb-1 font-medium text-gray-700">
                            Kysymys
                        </label>
                        <input
                            type="text"
                            id="question"
                            name="question"
                            placeholder="kysymys..."
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>

                    {/* Options with Correct Answer */}
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {["a", "b", "c", "d"].map((opt, idx) => (
                                <label
                                    key={opt}
                                    htmlFor={opt}
                                    className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 cursor-pointer hover:border-blue-400 transition-colors"
                                >
                                    <input
                                        type="radio"
                                        name="correct"
                                        id={opt}
                                        className="accent-blue-400 w-5 h-5"
                                        defaultChecked={idx === 0} // default first option
                                    />
                                    <input
                                        type="text"
                                        id={opt}
                                        name={opt}
                                        placeholder={`Vaihtoehto ${opt.toUpperCase()}`}
                                        className="flex-1 border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                                    />
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-around mt-4">
                        <Button_Primary
                            height="3rem"
                            width="10rem"
                            text="Lisää"
                            onClick={addQuestion}
                        />
                        <Button_Cancel
                            height="3rem"
                            width="10rem"
                            text="Peruuta"
                            onClick={cancel}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
