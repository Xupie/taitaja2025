import Button_Primary, { Button_Cancel } from "@/components/buttons";

type updateCategoryProps = {
    updateCategory: () => void;
    cancel: () => void;
}

export default function UpdateCategory({ updateCategory, cancel }: updateCategoryProps) {
    return (
        // Full-screen overlay
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            {/* Modal container */}
            <div className="bg-white rounded-xl shadow-xl w-full max-w-3xl p-6 relative">

                <h1 className="text-3xl text-center">Muokkaa kategoriaa</h1>
                {/* Question Input */}
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col my-2">
                        <label htmlFor="category_name" className="my-1 font-medium text-gray-700">
                            Nimi
                        </label>
                        <input
                            type="text"
                            id="category_name"
                            name="category_name"
                            placeholder="kategoria..."
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                        <label htmlFor="category_description" className="my-1 font-medium text-gray-700">
                            Kuvaus
                        </label>
                        <input
                            type="text"
                            id="category_description"
                            name="category_description"
                            placeholder="kuvaus..."
                            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-around mt-4">
                        <Button_Primary
                            height="3rem"
                            width="10rem"
                            text="Päivitä"
                            onClick={updateCategory}
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
