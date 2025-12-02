import Button_Primary from "./buttons";

type newQuestionProps = {
    addQuestion: () => void;
}

export default function NewQuestion({ 
        addQuestion
    }: newQuestionProps) {

    return (
        <div className="flex flex-col">

            <label htmlFor="question">Kysymys</label>
            <input type="text" id="question" />

            <label htmlFor="a">A</label>
            <input type="text" id="a" />

            <label htmlFor="b">B</label>
            <input type="text" id="b" />

            <label htmlFor="c">C</label>
            <input type="text" id="c" />

            <label htmlFor="d">D</label>
            <input type="text" id="d" />

            <Button_Primary height="3rem" text="Uusi kysymys" width="10rem" onClick={addQuestion} />
        </div>
    )
}