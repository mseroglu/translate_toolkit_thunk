import { useEffect, useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getLanguages, translateText } from "./redux/actions"
import Select from 'react-select'
import { setAnswer } from "./redux/slices/translateSlice"

const App = () => {
  const langState = useSelector(store => store.languageSlice)
  const translateState = useSelector(store => store.translateSlice)

  const [sourceLang, setSourceLang] = useState({ value: "tr", label: "Turkish" })
  const [targetLang, setTargetLang] = useState({ value: "en", label: "English" })
  const [text, setText] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getLanguages())
  }, [])

  const options = useMemo(
    () => langState.languages?.map(
      (item) => ({ value: item.code, label: item.name })),
    [langState.languages])

  const handleTranslate = () => {
    dispatch(translateText({ sourceLang, targetLang, text }))
  }


  const handleSwap = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setText(translateState.answer)
    dispatch(setAnswer(text))
  }


  return (
    <div className="bg-zinc-800 h-screen text-white grid place-items-center ">
      <div className="w-[80vw] max-w-[1100px] flex flex-col bg-red-400 px-3 py-5 gap-5">

        <h2 className="text-4xl font-semibold text-center">Translator + </h2>

        <div className="flex gap-2 text-black">
          <Select
            value={sourceLang}
            onChange={(lang) => setSourceLang(lang)}
            className="flex-1"
            options={options}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading} />
          <button onClick={handleSwap} className="text-white bg-zinc-700 rounded 
              py-2 px-6 transition hover:ring-2 hover:bg-zinc-800 ">Değiştir</button>
          <Select
            value={targetLang}
            onChange={(lang) => setTargetLang(lang)}
            className="flex-1"
            options={options}
            isLoading={langState.isLoading}
            isDisabled={langState.isLoading} />
        </div>

        <div className="flex gap-3 md:gap-8 max-md:flex-col">
          <div className="w-full p-0">
            <textarea
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[200px] max-h-[400px] p-3 text-xl text-black rounded "
              value={text}>
            </textarea>
          </div>
          <div className="relative w-full p-0">
            <textarea
              className="w-full min-h-[200px] max-h-[400px] p-3 text-xl text-black rounded m-0"
              value={translateState.answer}
              readOnly >
            </textarea>
            {translateState.isLoading && (
              <p className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                <div className="loader">
                  <span className="bar"></span>
                  <span className="bar"></span>
                  <span className="bar"></span>
                </div>
              </p>
            )}
          </div>

        </div>
        <button onClick={handleTranslate} className="rounded-md py-3 px-5 text-lg font-semibold cursor-pointer bg-zinc-500 
        hover:ring-2 ring-white hover:bg-zinc-600 transition">Çevir</button>
      </div>
    </div>
  )
}

export default App
