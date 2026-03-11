import { React, useState } from 'react';
import './index.scss';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { push } from 'connected-react-router';

import { forgotPasswordCompleted, forgotPasswordFailed, forgotPasswordStart } from 'state/modules/login/actions';
import { forgotPassword } from 'api';
import Router from 'routes/router';
import isPrint from 'state/modules/designCourse/edit/Error';
import Text, { TYPES as types, SIZES as sizes } from 'components/elements/TextNew';
import Input from 'components/elements/inputNew';
import Button from 'components/elements/buttons/BaseButtonNew';

const AffiliatePasswordReset = () => {
   const history = useHistory();
   const dispatch = useDispatch();

   const [email, setEmail] = useState('');

    const changeEmail = (name, value) => {
        setEmail(value);
    };

    const navigateToLoginPage = () => {
       history.goBack();
    };

    const resetPasswordSubmit = async (e) => {
        e.preventDefault();

        dispatch(forgotPasswordStart());
        try {
            await forgotPassword({ email });
            dispatch(forgotPasswordCompleted());
            dispatch(push(Router.route('AFFILIATE_FRONT_LOGIN').getMask()));
            if (isPrint('We have e-mailed your password reset link.')) {
                toast.success('We have e-mailed your password reset link.');
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data.errors && error.response.data.errors.email) {
                    if (isPrint(error.response.data.errors.email[0])) {
                        toast.error(error.response.data.errors.email[0]);
                    }
                }
            } else if (isPrint('Something went wrong.')) {
                toast.error('Something went wrong.');
            }
            dispatch(forgotPasswordFailed({}));
        }
    };

    return (
        <section className='passwordReset'>
            <div className='passwordReset_content'>
                <div className='passwordReset_content_info'>
                    <Text
                        inner='Forgot password'
                        type={ types.mediumSmall }
                        size={ sizes.new_size_28 }
                    />
                    <Text
                        inner='Please, enter your email address so we can send you a link for password reset'
                        type={ types.mediumSmall }
                        size={ sizes.medium }
                    />
                </div>
                <form className='passwordReset_content_form' onSubmit={resetPasswordSubmit}>
                    <Input
                        type='text'
                        value={ email }
                        label='Email'
                        placeholder='Enter your email'
                        name='email'
                        onChange={ changeEmail }
                    />
                    <div className='passwordReset_content_form_buttons'>
                        <Button
                            text='Confirm'
                            theme='explore'
                            type='submit'
                        />
                        <Button
                            text='Cancel'
                            theme='secondary'
                            style={ { marginTop: '0' } }
                            onClick={ navigateToLoginPage }
                            type='button'
                        />
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AffiliatePasswordReset;