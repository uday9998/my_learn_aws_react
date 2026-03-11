import React from 'react';
import PropTypes from 'prop-types';
import { useApiQuery } from 'utils/hooks/useQuery';
import { getAffiliateTemplate, updateAffiliateTemplate } from 'api';
import ComponentProgress from 'components/modules/ComponentProgress';
import AffiliateTemplate from 'views/pages/Affiliate/TemplateEditor';
import { useHistory } from 'react-router';
import { useSubmitForm } from 'utils/hooks/useSubmitForm';
import isPrint from 'state/modules/designCourse/edit/Error';
import { toast } from 'react-toastify';
import { AffiliateFrontContext } from 'containers/pages/affiliate/login';

// const slug = () => {
//    function s4() {
//       return new Date().getTime() + Math.floor(Math.random() * 1000000);
//    }
//    return `miestro-${ s4() }`;
// };
// const templateToBack = {
//    sections: [
//       {
//          affiliate_section: {
//             slug: slug(),
//             type: 'Main',
//             name: 'Main Background',
//             props: {
//                duplicated: 'main_background',
//                bgColor: '#fff',
//             },
//          },
//          affiliate_components: [
//             {
//                slug: slug(),
//                type: 'image',
//                name: 'Logo',
//                props: {
//                   image_src: '',
//                   order: 0,
//                   paddingTop: 0,
//                   paddingLeft: 0,
//                   paddingBottom: 0,
//                   paddingRight: 0,
//                   width: 30,
//                   justifyContent: 'center',
//                   visibility: true,
//                   borderRadius: 0,
//                },
//             },
//             {
//                slug: slug(),
//                type: 'text',
//                name: 'Headline',
//                props: {
//                   order: 1,
//                   text: 'Sign In With Your Email',
//                   textAlign: 'center',
//                   lineHeight: 130,
//                   fontWeight: '500',
//                   fontSize: 28,
//                   paddingTop: 32,
//                   paddingLeft: 0,
//                   paddingBottom: 0,
//                   paddingRight: 0,
//                   color: '#131F1E',
//                   bgColor: '',
//                   width: 100,
//                },
//             },
//             {
//                slug: slug(),
//                type: 'warning',
//                name: 'Description',
//                props: {
//                   order: 2,
//                   paddingTop: 12,
//                   paddingLeft: 0,
//                   paddingBottom: 0,
//                   textAlign: 'center',
//                   paddingRight: 0,
//                   color: '#131F1E',
//                   type: 'signup',
//                },
//             },
//             {
//                slug: slug(),
//                type: 'form',
//                name: 'Form',
//                props: {
//                   order: 2,
//                   paddingTop: 24,
//                   paddingLeft: 0,
//                   paddingBottom: 0,
//                   color: '#131f1e',
//                   textAlign: 'center',
//                   paddingRight: 0,
//                   type: 'signup',
//                },
//             },
//             {
//                slug: slug(),
//                type: 'button',
//                name: 'Submit Button',
//                props: {
//                   order: 3,
//                   paddingTop: 13,
//                   paddingLeft: 0,
//                   inner: 'Sign Up',
//                   paddingBottom: 13,
//                   margin: '32px 0px 0px 0px',
//                   width: 100,
//                   color: '#fff',
//                   textAlign: 'center',
//                   paddingRight: 0,
//                   justifyContent: 'center',
//                   background: '#24554E',
//                   visibility: true,
//                   type: 'signup',
//                },
//             },
//          ],
//       },
//       {
//          affiliate_section: {
//             slug: slug(),
//             type: 'Bottom',
//             name: 'Contact',
//             props: {
//                duplicated: 'contact',
//                visibility: true,
//             },
//          },
//          affiliate_components: [
//             {
//                slug: slug(),
//                type: 'text',
//                name: 'Help',
//                props: {
//                   order: 0,
//                   text: 'Need Help? Contact Support',
//                   fontWeight: '500',
//                   fontSize: 16,
//                   paddingTop: 0,
//                   paddingLeft: 0,
//                   paddingBottom: 16,
//                   paddingRight: 0,
//                   color: '#444C4B',
//                   lineHeight: 148,
//                   bgColor: '',
//                   width: 100,
//                   textAlign: 'center',
//                },
//             },
//             {
//                slug: slug(),
//                type: 'contactBottom',
//                name: 'Bottom',
//                props: {
//                   order: 1,
//                   paddingTop: 16,
//                   paddingLeft: 0,
//                   paddingRight: 0,
//                   paddingBottom: 0,
//                },
//                subcomponents: [
//                   {
//                      slug: slug(),
//                      type: 'text',
//                      name: 'Number',
//                      props: {
//                         text: '1-844-542-5275',
//                         fontWeight: '400',
//                         fontSize: 16,
//                         paddingTop: 16,
//                         paddingLeft: 0,
//                         paddingBottom: 0,
//                         paddingRight: 38,
//                         color: '#444C4B',
//                         lineHeight: 148,
//                         bgColor: '',
//                         textAlign: 'end',
//                         isIconText: true,
//                         iconColor: '#444C4B',
//                         iconName: 'UpsellNumberM',
//                      },
//                   },
//                   {
//                      slug: slug(),
//                      type: 'text',
//                      name: 'Mail',
//                      props: {
//                         text: '1-844-542-5275',
//                         fontWeight: '400',
//                         fontSize: 16,
//                         paddingTop: 16,
//                         paddingLeft: 0,
//                         paddingBottom: 0,
//                         paddingRight: 0,
//                         color: '#444C4B',
//                         lineHeight: 148,
//                         bgColor: '',
//                         textAlign: 'center',
//                         isIconText: true,
//                         iconColor: '#444C4B',
//                         iconName: 'UpsellMailM',
//                      },
//                   },
//                ],
//             },
//          ],
//       },
//    ],
// };

const AffiliateTemplateEditor = ({ match }) => {
   const { data: landing, loading } = useApiQuery(
      getAffiliateTemplate,
      [{ affiliateId: match.params.id, templateId: match.params.templateId }]
   );
   const [updateLanding] = useSubmitForm(updateAffiliateTemplate);
   const history = useHistory();
   const handleSaveTemplate = (template) => {
      updateLanding({ payload: template, affiliateId: match.params.id, templateId: match.params.templateId }, () => {
         if (isPrint('Template updated successfuly.')) {
            toast.success('Template updated successfuly.');
         }
      });
   };
   const [data, setData] = React.useState({
      email: '',
      password: '',
      remember: false,
   });
   const handleInputChange = (name, value) => {
      setData({
         ...data,
         [name]: value,
      });
   };
   const onSubmit = () => {
   };
   return (
      <ComponentProgress loading={ loading }>
         <AffiliateFrontContext.Provider value={ { data, handleInputChange, onSubmit } }>
            <AffiliateTemplate
               initalTemplate={ landing }
               handleSaveTemplate={ handleSaveTemplate }
               goBack={ () => history.goBack() }
            />
         </AffiliateFrontContext.Provider>
      </ComponentProgress>
   );
};

AffiliateTemplateEditor.propTypes = {
   match: PropTypes.object,
};

export default AffiliateTemplateEditor;
