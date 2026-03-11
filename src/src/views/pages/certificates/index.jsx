// import React from 'react';
// import PropTypes from 'prop-types';
// import Content from 'components/modules/certificates/content';
// import Certificate from 'components/modules/certificates/certificate';
// import Design from 'components/modules/certificates/design';
// import TextInput from 'components/elements/form/TextInput';
// import NavItem from 'components/elements/designCourse/NavItem';
// import CertificateCard from 'components/modules/certificates/certificateCard';
// // import CertificatesTemplates from 'components/modules/certificates/certificatesTemplates';
// import { ReactComponent as AddSectionIcon } from 'assets/images/add-section.svg';
// import './index.scss';
// import Icon from 'components/elements/Icon';

// const Certificates = (props) => {
//    const changeCertificate = (c) => alert(c);
//    return (
//       <div className='certificates'>
//          <div className='certificateNameRectangle'>
//             <div style={ { width: '544px' } }>
//                <TextInput
//                   label='name'
//                   placeholder='Certificates'
//                />
//                <Icon name='copyIcon' />
//             </div>
//             <div className='line' />
//          </div>


//          <div style={ {
//             display: 'flex', marginTop: '32px', marginBottom: '24px', borderBottom: '1px solid #c1cedb',
//          } }
//          >
//             <NavItem text='Choose template' />
//             <NavItem text='Template List' />
//             <NavItem text='content' />
//             <NavItem text='design' />
//          </div>

//          <div style={ { display: 'flex' } }>
//             { false
//                ? (
//                   <div className='certificateColumn'>
//                      { [{ color: 'red', id: 0 }, { color: 'yellow', id: 1 }, { color: 'green', id: 2 }, { color: 'blue', id: 3 }].map((i) => {
//                         return (
//                            <div style={ { marginBottom: '5px', height: '200px' } }>
//                               <Certificate color={ i.color } key={ i } el={ i.id } changeCertificate={ () => changeCertificate(i.color) } />
//                            </div>
//                         );
//                      })}
//                   </div>
//                ) : (
//                   <div className='designContentRectangle' style={ { height: '500px', overflow: 'scroll', overflowX: 'hidden' } }>
//                      <Content />
//                      {/* <Design /> */}
//                   </div>
//                )
//             }

//             <div style={ { paddingLeft: ' 24px', width: '100%', height: '500px' } }>
//                <Certificate color='red' />
//             </div>

//          </div>
//          <div style={ { display: 'flex', flexDirection: 'column' } }>
//             <div style={ { display: 'flex', justifyContent: 'space-between', paddingBottom: '16px' } }>
//                <span>Templates</span>
//                <div>
//                   <Icon name='Add' />
//                   <Icon name='Delete' />
//                   <Icon name='Copy' />
//                </div>
//             </div>

//             <div style={ { display: 'flex' } }>
//                <div style={ {
//                   display: 'flex', width: '300px', borderRight: '5px solid green', paddingRight: '24px',
//                } }
//                >
//                   { [{ color: 'red', id: 0 }, { color: 'yellow', id: 1 }, { color: 'green', id: 2 }, { color: 'blue', id: 3 }].map((i) => {
//                      return (
//                         <div style={ { marginBottom: '5px', height: '150px', width: '370px' } }>
//                            <Certificate color={ i.color } key={ i } el={ i.id } changeCertificate={ () => changeCertificate(i.color) } />
//                         </div>
//                      );
//                   })}
//                </div>

//                <div style={ { width: '720px', height: '496px', marginleft: '22px' } }>
//                   <Certificate color='red' />
//                   <div>
//                      <AddSectionIcon />
//                   </div>
//                </div>
//             </div>
//          </div>

//       </div>
//    );
// };

// Certificates.propTypes = {

// };

// export default Certificates;
