import {useContext, useEffect, useState} from 'react'
import {Switch} from '@headlessui/react'
import {store} from "../../../data/DataProvider";

function SaveToggle() {

    const {state, dispatch} = useContext(store);
    const [enabled, setEnabled] = useState<boolean>(false)

    useEffect(()=>{
        setEnabled(state.persistTasks);
    }, [])

    useEffect(() => {
        dispatch({type: 'persist', value: enabled})
    }, [enabled])

    return (
        <Switch.Group>
            <div className="ml-2 flex items-center border-2 rounded-md border-gray-600 p-2 bg-white">
                <Switch.Label className="mr-4">{state?.language?.strings.persistenceText || 'Save Changes'}
                </Switch.Label>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${
                        enabled ? 'bg-blue-600' : 'bg-gray-200'
                    } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                >
          <span
              className={`${
                  enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
          />
                </Switch>
            </div>
        </Switch.Group>
    )
}

export default SaveToggle;