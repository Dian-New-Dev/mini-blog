import React from 'react';
import { isRouteErrorResponse, useRouteError, Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {

    const error:unknown = useRouteError();
    console.error(error)

    return (
        <div className='w-full h-full p-32'>
            <div 
            className='
            flex 
            flex-col 
            gap-8
            items-start
            '
            >
            
                <h1 
                className='
                text-5xl
                '>
                    Tivemos um Problema</h1>

                <p className='italic text-2xl'>
                    <i>
                            {
                                isRouteErrorResponse(error) ?
                                    (
                                        error.statusText || error.status
                                    ) :
                                    'Unknown error message'
                            }
                    </i>
                </p>

                <button
                className='
                bg-green-900
                p-4
                rounded-lg
                text-green-200
                hover:bg-green-950
                '>
                    <Link to={`/`}>Voltar ao Início</Link>
                </button>
            </div>
            
            
        </div>
    );

};

export default ErrorPage;