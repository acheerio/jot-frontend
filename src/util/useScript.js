import { useEffect } from 'react';

const useScript = (url, async, defer) => {
    useEffect(() => {
        const script = document.createElement('script');

        script.src = url;
        script.async = async;
        script.defer = defer;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, [url]);
};

export default useScript;

// copied from https://stackoverflow.com/questions/34424845/adding-script-tag-to-react-jsx