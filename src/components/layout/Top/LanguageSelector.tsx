import React, {Fragment, useContext, useEffect, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'
import {store} from "../../../data/DataProvider";
import {LanguageType} from "../../../types/LanguageType";

// quick and dirty localization strings
const translationDictionary = {
    'en': {
        addColumn: 'Add Column',
        addCard: 'Add Card',
        persistenceText: 'Save Changes',
        deleteColumn: "Only empty Columns are allowed to be deleted",
        confirm: "Are you sure?"
    },
    'es': {
        addColumn: 'Mas Columnas',
        addCard: 'Mas Tarjetas',
        persistenceText: 'Guardar Cambios',
        deleteColumn: 'Sólo las columnas vacias se pueden borrar',
        confirm: "Estas seguro?"
    },
    'ko': {
        addColumn: '열 추가',
        addCard: '카드 추가',
        persistenceText: '저장 모드',
        deleteColumn: '비어 있는 열만 삭제할 수 있습니다.',
        confirm: '확실합니까?'
    },
}

const languages = [
    {id: 1, name: 'English', code: 'en', strings: translationDictionary['en']},
    {id: 2, name: 'Korean', code: 'ko', strings: translationDictionary['ko']},
    {id: 3, name: 'Spanish', code: 'es', strings: translationDictionary['es']},
]

export default function LanguageSelector() {
    const {state, dispatch} = useContext(store);

    const [selected, setSelected] = useState<LanguageType>(state.language || languages[0])

    useEffect(() => {
        dispatch({type: 'language', value: selected})
    }, [selected])

    return (
        <div className="w-72 top-16 border-2 rounded-md border-gray-600 ml-2">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Listbox.Button
                        className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                        <span className="block truncate">{selected.name}</span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <SelectorIcon
                  className="w-5 h-5 text-gray-400"
                  aria-hidden="true"
              />
            </span>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {languages.map((language, langIdx) => (
                                <Listbox.Option
                                    key={langIdx}
                                    className={({active}) =>
                                        `cursor-default select-none relative py-2 pl-10 pr-4 ${
                                            active ? 'text-amber-900 bg-amber-100' : 'text-gray-900'
                                        }`
                                    }
                                    value={language}
                                >
                                    {({selected}) => (
                                        <>
                                          <span
                                              className={`block truncate ${
                                                  selected ? 'font-medium' : 'font-normal'
                                              }`}
                                          >
                                            {language.name}
                                          </span>
                                            {selected && (
                                                <span
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="w-5 h-5" aria-hidden="true"/>
                        </span>
                                            )}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    )
}