import React, { useState, useEffect } from 'react'
import './index.scss'
import PropTypes from 'prop-types'
import ItemWrapper from 'components/elements/wrappers/ItemWrapper'
import IntegrationElem from 'components/elements/settings/IntegrationElem'
import Text, {
   TYPE as TextType,
   SIZES as TextSize
} from 'components/elements/Text'
import Loader from 'components/elements/Loader'
import InnerWrapper from 'components/elements/wrappers/InnerWrapper'
import stripeSvg from 'assets/images/stripe.svg'
import paystackSvg from 'assets/images/paystack.png'
import braintreeSvg from 'assets/images/braintree-svg.svg'
import boomfiSvg from 'assets/images/crypto.png'
import payPalSvg from 'assets/images/pay-pal.svg'
import zapierPng from 'assets/images/zapier.png'
import googleAnalyticsPng from 'assets/images/google-analytics.png'
import aweberPng from 'assets/images/aweber.png'
import mailchimpPng from 'assets/images/mailchimp.png'
import activeCampaignPng from 'assets/images/active-campaign.png'
import facebookPixelPng from 'assets/images/facebook-pixel.png'
import convertKitPng from 'assets/images/convert-kit.png'
import dripPng from 'assets/images/drip.png'
import { useIntegrationSettings } from 'utils/hooks/useIntegrationSettings'

const Integration = ({
   integrationSettings,
   onChange,
   handleConnectIntegration,
   handleDisconnect,
   memberPermissions,
   integrationErrors = {},
   integrationLoading = {},
   clearIntegrationError
}) => {
   const { updateIntegrationSettings } = useIntegrationSettings()

   useEffect(() => {
      updateIntegrationSettings(integrationSettings)
   }, [integrationSettings, updateIntegrationSettings])

   const [integrations, setIntegrations] = useState({
      mailchimp: false,
      'facebook-pixel': false,
      activecampaign: false,
      convertkit: false,
      drip: false,
      paypal: false,
      paypalv2: false,
      paystack: false,
      'google-analytics': false,
      zapier: false
   })

   const paymentMethods = [
      {
         id: 'stripe',
         name: 'Stripe',
         isConnected: integrationSettings.stripe_connected
      },
      {
         id: 'braintree',
         name: 'Braintree',
         isConnected: integrationSettings.braintree_connected
      },
      {
         id: 'paystack',
         name: 'Paystack',
         isConnected: integrationSettings.paystack_connected
      },
      {
         id: 'boomfi',
         name: 'Crypto',
         isConnected: integrationSettings.boomfi_connected
      },
      {
         id: 'paypalv2',
         name: 'PayPal',
         isConnected: integrationSettings.paypalv2_connected
      }
   ]

   useEffect(() => {
      const integratedPaymentMethods = paymentMethods.filter(
         method => method.isConnected
      )
      const nonIntegratedPaymentMethods = paymentMethods.filter(
         method => !method.isConnected
      )
   }, [integrationSettings])

   const stripeData = {
      email: integrationSettings.stripe_email,
      accountId: integrationSettings.stripe_account_id
   }

   const setIntegrationState = (integration, value) => {
      const newIntegrations = Object.assign({}, integrations)
      newIntegrations[integration] = value
      setIntegrations(newIntegrations)
   }

   const setIntegrationOpened = (integration, state) => {
      setIntegrationState(integration, state)
   }

   const handleConnectWithErrorHandling = (integrationId, data) => {
      return handleConnectIntegration(integrationId, data);
   }

   const handleIntegrationChange = (inputName, value) => {
      const integrationId = Object.keys(integrationErrors).find(key => integrationErrors[key])
      if (integrationId && clearIntegrationError) {
         clearIntegrationError(integrationId)
      }
      onChange(inputName, value)
   }

   const handleIntegrationOpened = (integrationId, state) => {
      if (clearIntegrationError) {
         clearIntegrationError(integrationId)
      }
      setIntegrationOpened(integrationId, state)
   }

   useEffect(() => {
      if (integrations.zapier) {
         const existingScript = document.querySelector('script[src*="zapier.com/apps/embed/widget.js"]');
         if (existingScript) {
            existingScript.remove();
         }
         
         const script = document.createElement('script');
         script.src = 'https://zapier.com/apps/embed/widget.js';
         script.async = true;
         script.charset = 'utf-8';
         document.body.append(script);
         
         return () => {
            const scriptToRemove = document.querySelector('script[src*="zapier.com/apps/embed/widget.js"]');
            if (scriptToRemove) {
               scriptToRemove.remove();
            }
         };
      }
   }, [integrations.zapier]);

   return (
      <InnerWrapper title='Integrations'>
         {process.env.NODE_ENV !== 'production' && (
            <div
               style={{
                  backgroundColor: '#f5f5f5',
                  padding: '10px',
                  marginBottom: '20px',
                  fontSize: '12px'
               }}
            >
               <div>
                  <strong>Debug - Integration Settings:</strong>
               </div>
               <pre style={{ maxHeight: '150px', overflow: 'auto' }}>
                  {JSON.stringify(integrationSettings, null, 2)}
               </pre>
            </div>
         )}
         <div className='integration'>
            {memberPermissions() === 'admin' && (
               <>
                  <div className='integration__elem'>
                     <IntegrationElem
                        title='Stripe'
                        subtitle='Miestro has partnered with stripe to accept credit cards online'
                        id='stripe'
                        isOauth
                        onDisconnect={handleDisconnect}
                        image={stripeSvg}
                        onChange={handleIntegrationChange}
                        onConnect={handleConnectWithErrorHandling}
                        conected={integrationSettings.stripe_connected}
                        disabled={
                           integrationSettings.braintree_connected ||
                           integrationSettings.paystack_connected
                        }
                        data={[]}
                        stripeData={stripeData}
                        error={integrationErrors.stripe}
                        loading={integrationLoading.stripe}
                        onErrorClear={() => clearIntegrationError && clearIntegrationError('stripe')}
                        helpUri={
                           integrationSettings.stripe_connected
                              ? 'https://support.miestro.com/594449-How-to-Disconnect-Stripe'
                              : 'https://support.miestro.com/177919-Integrating-with-Stripe'
                        }
                     />
                  </div>
                  <div className='integration__elem'>
                     <IntegrationElem
                        title='Braintree'
                        subtitle='Miestro has partnered with braintree to accept credit cards online'
                        id='braintree'
                        image={braintreeSvg}
                        disabled={
                           integrationSettings.stripe_connected ||
                           integrationSettings.paystack_connected
                        }
                        isOauth={integrationSettings.braintree_connected}
                        conected={integrationSettings.braintree_connected}
                        isOpened={integrations.braintree}
                        onChange={handleIntegrationChange}
                        onDisconnect={handleDisconnect}
                        setIsOpened={handleIntegrationOpened}
                        onConnect={handleConnectWithErrorHandling}
                        error={integrationErrors.braintree}
                        loading={integrationLoading.braintree}
                        onErrorClear={() => clearIntegrationError && clearIntegrationError('braintree')}
                        data={[
                           {
                              label: 'Merchant Id',
                              field_value: integrationSettings.merchant_id,
                              name: 'merchant_id',
                              placeholder: 'Merchant Id'
                           },
                           {
                              label: 'Public Key',
                              field_value: integrationSettings.public_key,
                              name: 'public_key',
                              placeholder: 'Public Key'
                           },
                           {
                              label: 'Private Key',
                              field_value: integrationSettings.private_key,
                              name: 'private_key',
                              placeholder: 'Private Key'
                           }
                        ]}
                        helpUri='https://support.miestro.com/601154-Integration-with-Braintree'
                     />
                  </div>
                  <div className='integration__elem'>
                     <IntegrationElem
                        title='Paystack'
                        subtitle='Miestro has partnered with Paystack to accept credit cards online'
                        id='paystack'
                        image={paystackSvg}
                        disabled={
                           integrationSettings.stripe_connected ||
                           integrationSettings.braintree_connected
                        }
                        isOauth={integrationSettings.paystack_connected}
                        conected={integrationSettings.paystack_connected}
                        isOpened={integrations.paystack}
                        onChange={handleIntegrationChange}
                        onDisconnect={handleDisconnect}
                        setIsOpened={handleIntegrationOpened}
                        onConnect={handleConnectWithErrorHandling}
                        error={integrationErrors.paystack}
                        loading={integrationLoading.paystack}
                        onErrorClear={() => clearIntegrationError && clearIntegrationError('paystack')}
                        data={[
                           {
                              label: 'Public Key',
                              field_value: integrationSettings.public_key,
                              name: 'public_key',
                              placeholder: 'Public Key'
                           },
                           {
                              label: 'Secret Key',
                              field_value: integrationSettings.secret_key,
                              name: 'secret_key',
                              placeholder: 'Secret Key'
                           }
                        ]}
                        helpUri='https://support.miestro.com/456328-Integrating-with-Paystack'
                     />
                  </div>
                  <div className='integration__elem'>
                     <IntegrationElem
                        title='Crypto'
                        subtitle='Miestro has partnered with crypto payment'
                        id='boomfi'
                        image={boomfiSvg}
                        isOauth={integrationSettings.boomfi_connected}
                        conected={integrationSettings.boomfi_connected}
                        isOpened={integrations.boomfi}
                        onChange={handleIntegrationChange}
                        onDisconnect={handleDisconnect}
                        setIsOpened={handleIntegrationOpened}
                        onConnect={handleConnectWithErrorHandling}
                        error={integrationErrors.boomfi}
                        loading={integrationLoading.boomfi}
                        onErrorClear={() => clearIntegrationError && clearIntegrationError('boomfi')}
                        data={[
                           {
                              label: 'Api Key',
                              field_value: integrationSettings.api_key,
                              name: 'api_key',
                              placeholder: 'Api Key'
                           }
                        ]}
                        helpUri='https://support.miestro.com/590948-Integrating-with-BoomFi'
                     />
                  </div>
                  <div className='integration__elem'>
                     <IntegrationElem
                        title='PayPal'
                        tooltipText='A PayPal Business Account is required to connect a PayPal account. If you already have a personal account it can be upgraded.'
                        hasTooltip={true}
                        subtitle='Integrate your PayPal account to accept payments online'
                        image={payPalSvg}
                        helpUri='https://support.miestro.com/549100-Integrating-with-PayPal'
                        id='paypalv2'
                        isOpened={integrations.paypalv2}
                        onChange={handleIntegrationChange}
                        setIsOpened={handleIntegrationOpened}
                        onConnect={handleConnectWithErrorHandling}
                        onDisconnect={handleDisconnect}
                        value={integrationSettings.paypal_client_id_v2}
                        conected={integrationSettings.paypalv2_connected}
                        error={integrationErrors.paypalv2}
                        loading={integrationLoading.paypalv2}
                        onErrorClear={() => clearIntegrationError && clearIntegrationError('paypalv2')}
                        data={[
                           {
                              label: 'Miestro will track all the the data with Google Analytics and keep track of your pages in Miestro.',
                              field_value:
                                 integrationSettings.paypal_client_id_v2,
                              name: 'paypal_client_id_v2',
                              placeholder: 'Client ID'
                           },
                           {
                              field_value: integrationSettings.paypal_secret_v2,
                              name: 'paypal_secret_v2',
                              placeholder: 'Secret'
                           }
                        ]}
                     />
                  </div>
               </>
            )}
            <div className='integration__elem'>
               <IntegrationElem
                  title='Zapier'
                  subtitle='Zapier lets you connect apps you use everyday with Miestro and automate workflows'
                  image={zapierPng}
                  id='zapier'
                  helpUri='https://support.miestro.com/811033-Integrating-with-Zapier'
                  isOpened={integrations.zapier}
                  onChange={handleIntegrationChange}
                  onDisconnect={handleDisconnect}
                  setIsOpened={handleIntegrationOpened}
                  onConnect={handleConnectWithErrorHandling}
                  conected={integrationSettings.zapier_connected}
                  error={integrationErrors.zapier}
                  loading={integrationLoading.zapier}
                  onErrorClear={() => clearIntegrationError && clearIntegrationError('zapier')}
                  content={
                     <div>
                        <zapier-zap-templates
                           apps='miestro'
                           limit='10'
                           use-this-zap='show'
                           theme='auto'
                        />
                     </div>
                  }
                  text='Please copy and paste the following API Key and API Secret into your Zapier account to do the integration.'
                  data={[
                     {
                        label: 'Api key',
                        field_value: integrationSettings.api_key,
                        name: 'api_key',
                        field_disabled: true,
                        copy: true,
                        placeholder: ''
                     },
                     {
                        label: 'Api secret',
                        field_value: integrationSettings.api_secret,
                        field_disabled: true,
                        name: 'api_secret',
                        copy: true,
                        placeholder: ''
                     }
                  ]}
               />
            </div>
            <div className='integration__elem'>
               <IntegrationElem
                  title='Google Analytics'
                  subtitle='Automatically track your users, and other data with Google Analytics'
                  image={googleAnalyticsPng}
                  helpUri='https://support.miestro.com/559509-Integrating-with-Google-Analytics'
                  id='google-analytics'
                  isOpened={integrations['google-analytics']}
                  onChange={handleIntegrationChange}
                  setIsOpened={handleIntegrationOpened}
                  onConnect={handleConnectWithErrorHandling}
                  onDisconnect={handleDisconnect}
                  value={integrationSettings.google_analytics_id}
                  conected={integrationSettings['google-analytics_connected']}
                  error={integrationErrors['google-analytics']}
                  loading={integrationLoading['google-analytics']}
                  onErrorClear={() => clearIntegrationError && clearIntegrationError('google-analytics')}
                  data={[
                     {
                        label: 'Miestro will track all the the data with Google Analytics and keep track of your pages in Miestro.',
                        field_value: integrationSettings.google_analytics_id,
                        name: 'google_analytics_id',
                        placeholder: 'Ex: UA-XXXXXX-X'
                     }
                  ]}
               />
            </div>
            <div className='integration__elem'>
               <IntegrationElem
                  title='Aweber'
                  subtitle='Automatically add your Aweber customers when they sign up for your products or membership plans'
                  id='aweber'
                  helpUri='https://support.miestro.com/912930-Integrating-with-AWeber'
                  isOauth
                  onDisconnect={handleDisconnect}
                  image={aweberPng}
                  onChange={handleIntegrationChange}
                  onConnect={handleConnectWithErrorHandling}
                  conected={integrationSettings.aweber_connected}
                  error={integrationErrors.aweber}
                  loading={integrationLoading.aweber}
                  onErrorClear={() => clearIntegrationError && clearIntegrationError('aweber')}
                  data={[]}
               />
            </div>
            <div className='integration__elem'>
               <IntegrationElem
                  title='MailChimp'
                  subtitle='Automatically add your Mailchimp customers when they sign up for your products or membership plans'
                  image={mailchimpPng}
                  id='mailchimp'
                  helpUri='https://support.miestro.com/475943-Integrating-with-MailChimp'
                  isOpened={integrations.mailchimp}
                  onChange={handleIntegrationChange}
                  onDisconnect={handleDisconnect}
                  setIsOpened={handleIntegrationOpened}
                  onConnect={handleConnectWithErrorHandling}
                  value={integrationSettings.mailchimp_api_key}
                  conected={integrationSettings.mailchimp_connected}
                  error={integrationErrors.mailchimp}
                  loading={integrationLoading.mailchimp}
                  onErrorClear={() => clearIntegrationError && clearIntegrationError('mailchimp')}
                  data={[
                     {
                        label: 'Miestro will add users in your Mailchimp lists when someone signs up for a specific class.',
                        field_value: integrationSettings.mailchimp_api_key,
                        name: 'mailchimp_api_key',
                        placeholder: 'Your MailChimp API-KEY'
                     }
                  ]}
               />
            </div>
            <div className='integration__elem'>
               <IntegrationElem
                  title='Active Campaign'
                  subtitle='Automatically add your Active Campaign customers when they sign up for your products or membership plans'
                  image={activeCampaignPng}
                  helpUri='https://support.miestro.com/132697-Integrating-with-ActiveCampaign'
                  id='activecampaign'
                  isOpened={integrations.activecampaign}
                  onChange={handleIntegrationChange}
                  value={integrationSettings.active_campaign_api_key}
                  setIsOpened={handleIntegrationOpened}
                  onConnect={handleConnectWithErrorHandling}
                  onDisconnect={handleDisconnect}
                  conected={integrationSettings.activecampaign_connected}
                  error={integrationErrors.activecampaign}
                  loading={integrationLoading.activecampaign}
                  onErrorClear={() => clearIntegrationError && clearIntegrationError('activecampaign')}
                  data={[
                     {
                        label: 'Miestro will add users in your ActiveCampaign lists when someone signs up for a specific class.',
                        field_value:
                           integrationSettings.active_campaign_api_key,
                        name: 'active_campaign_api_key',
                        placeholder: 'Your ActiveCampaign API-KEY'
                     },
                     {
                        label: '',
                        field_value:
                           integrationSettings.active_campaign_api_url,
                        name: 'active_campaign_api_url',
                        placeholder: 'Your ActiveCampaign API-URL'
                     }
                  ]}
               />
            </div>
            <div className='integration__elem'>
               <IntegrationElem
                  title='Facebook Pixel'
                  subtitle='Automatically track your users, and other data with the Facebook pixel'
                  image={facebookPixelPng}
                  helpUri='https://support.miestro.com/170879-Connect-Facebook-Pixel'
                  id='facebook-pixel'
                  isOpened={integrations['facebook-pixel']}
                  onChange={handleIntegrationChange}
                  onDisconnect={handleDisconnect}
                  setIsOpened={handleIntegrationOpened}
                  onConnect={handleConnectWithErrorHandling}
                  conected={integrationSettings['facebook-pixel_connected']}
                  value={integrationSettings.facebook_pixel_code}
                  error={integrationErrors['facebook-pixel']}
                  loading={integrationLoading['facebook-pixel']}
                  onErrorClear={() => clearIntegrationError && clearIntegrationError('facebook-pixel')}
                  data={[
                     {
                        label: 'Use a Facebook pixel track analytics, purchases, and campaigns.',
                        field_value: integrationSettings.facebook_pixel_code,
                        name: 'facebook_pixel_code',
                        placeholder: 'Your Facebook Pixel code'
                     }
                  ]}
               />
            </div>
            <div className='integration__elem'>
               <IntegrationElem
                  title='Convert Kit'
                  subtitle='Automatically add your Converkit customers when they sign up for your products or membership plans'
                  image={convertKitPng}
                  helpUri='https://support.miestro.com/612962-Integrating-with-ConvertKit'
                  id='convertkit'
                  isOpened={integrations.convertkit}
                  onChange={handleIntegrationChange}
                  onDisconnect={handleDisconnect}
                  setIsOpened={handleIntegrationOpened}
                  onConnect={handleConnectWithErrorHandling}
                  value={integrationSettings.convertkit_api_secret}
                  conected={integrationSettings.convertkit_connected}
                  error={integrationErrors.convertkit}
                  loading={integrationLoading.convertkit}
                  onErrorClear={() => clearIntegrationError && clearIntegrationError('convertkit')}
                  data={[
                     {
                        label: 'Miestro will add users in your Drip lists when someone signs up for a specific class.',
                        field_value: integrationSettings.convertkit_api_secret,
                        name: 'convertkit_api_secret',
                        placeholder: 'Your ConvertKit API-SECRET'
                     },
                     {
                        label: '',
                        field_value: integrationSettings.convertkit_api_key,
                        name: 'convertkit_api_key',
                        placeholder: 'Your ConvertKit API-KEY'
                     }
                  ]}
               />
            </div>
            <div className='integration__elem'>
               <IntegrationElem
                  title='Drip'
                  subtitle='Automatically add your Drip customers when they sign up for your products or membership plans'
                  image={dripPng}
                  id='drip'
                  isOpened={integrations.drip}
                  helpUri='https://support.miestro.com/997477-Integrating-with-Drip'
                  onChange={handleIntegrationChange}
                  onDisconnect={handleDisconnect}
                  setIsOpened={handleIntegrationOpened}
                  onConnect={handleConnectWithErrorHandling}
                  value={integrationSettings.drip_api_key}
                  conected={integrationSettings.drip_connected}
                  error={integrationErrors.drip}
                  loading={integrationLoading.drip}
                  onErrorClear={() => clearIntegrationError && clearIntegrationError('drip')}
                  data={[
                     {
                        label: 'Miestro will add users in your Drip lists when someone signs up for a specific class.',
                        field_value: integrationSettings.drip_api_key,
                        name: 'drip_api_key',
                        placeholder: 'Your Drip API-KEY'
                     },
                     {
                        label: '',
                        field_value: integrationSettings.drip_account_id,
                        name: 'drip_account_id',
                        placeholder: 'Your Drip account ID'
                     }
                  ]}
               />
            </div>
         </div>
      </InnerWrapper>
   )
}

Integration.propTypes = {
   integrationSettings: PropTypes.object,
   onChange: PropTypes.func,
   handleDisconnect: PropTypes.func,
   handleConnectIntegration: PropTypes.func,
   memberPermissions: PropTypes.func,
   integrationErrors: PropTypes.object,
   integrationLoading: PropTypes.object,
   clearIntegrationError: PropTypes.func
}

export default Integration