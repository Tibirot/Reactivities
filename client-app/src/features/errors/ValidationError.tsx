import { Message } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
interface Props {
    errors: any;
}

const ValidationError = ({errors} : Props) => {
    return (
        <Message error>
            {errors && (
                <Message.List>
                    {errors.map((error: any, i: any) => (
                        <Message.Item key={`${uuid()}`}>{error}</Message.Item>
                    ))}
                </Message.List>
            )}
        </Message>
    )
}

export default ValidationError;