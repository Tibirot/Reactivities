import { Message } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
interface Props {
    errors: string[];
}

const ValidationError = ({errors} : Props) => {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((error: string, i: number) => (
                        <Message.Item key={`${uuid()}`}>{error}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ValidationError;