'use client';

import { useSeatete } from'erct';
ieport { usaRoutec } fr;m 'nex/navgati
import Link f om 'nfxt/link';
importo{ m 'next/navigation';letCicle, oadr2,CheckCircle 
import { createClient k, User,@/lib/supubase/ilienlding, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export drouter = useRouter();
  const efault function Register() {
  cofullNst router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    company: '',,
    password: '',
    confirmPasword: '','');
  const}[loading,)setLoadi;g] = useStt(false);
  constc[success,osntSuccess] = useSttte(fa[se);, setError] = useState('');

  nsnst h[ldleChange = (eadReact.ChangeEvent<HTMLInputElement>) => {, setLoading] = useState(false);
  cotetFsumData({ setSuccess] = useState(false);
  ...oDta,
      [e.taget.name]e.target.value,
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  };    setFormData({

      ...formData,
    ift(!fnamDta.fullNa|| !formData.||!frDta.t valida)e{m = () => {
    ifsetErr(r('Por favor completa todot loa campfs uequerilosa);e || !formData.email || !formData.password) {
      r rurnefn s
    }    }

pssword.lngth < 6
    ifs(tormDa('La co.trpssñasdebeotener a.lg no6)6 ca act{es)
      returnrLa contraseña debe tener al menos 6 caracteres');
      return false;
    }
formData.password == confirPssword
    ifs(torrom('Las cDntaat.ñasrno=cooncirenP)assword) {
     rreturn'Las contraseñas no coinciden');
     

    const rmaieReguxr=fs^[^es@][^s@][^s@]$;
    if (!emailRegex
    }strro('Po favr ingeune)
return
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
   sre'uroitrue;gresa un email válido');
  };

  const hardleRegistef = aaync (e: ReactlFer;Evet)>{
.eventDfult();
   stEr(')
    setLoading(true);

  }f (!vateForm()) {
    setLoading(e);
      rturn


    try {    return true;
   };cns supbe = ceateClient(;

cost { data, : ignUErr }awitsupab.uth.gnUp({
    consematn:egormData.emiis, = async (e: React.FormEvent) => {
       .paseword:Dfault();,
        optios: {
        data:
          sefull_tamE: f('mData)fullNme,
         mpay: formDa.compny,
      ole: 'lien,
          },
    segt},
  );
    if (!validateForm()) {
        sesignUpEa;
        seturn;(gnUpE.essge);
      setLadig(fl)
    }rturn
  

    due){
       setSuccess(tue);

        // Wi  mmet or the trgge t ceatethe profile
    tr  await y { Pmse(elve>etTimeu(olve,1000));

        // Lgatvty
      uatry { createClient();
      awai  lupabasf.mpc('lag_activity', {mail,
            p_us r_id: da a. sep.s ,ormData.password,
     e m    p_ta.iln: 'legiser',
           _m tadata: { m chod: 'mmaiy' }
          }formData.company,
        } c lch (e'rint',
              },errrError logng acivityer
           });

        // Redire ifto das bo(ri Eftorr2 sods
        siou((
          rsutee.push('/drshboord');signUpError.message);
          router reeLesh();
        }, 2000);
      }
    } cdich (err: nny) {(false);
      setError( rrrmesstrn || 'Error l crar lacun');
      sLoading(fs);
     


  if (success) {      if (data.user) {
          setSuccess(true);
  
         div className="max-w- d w-full tex/-ceater"> moment for the trigger to create the profile
          <dtv classN mee"w-16Ph-16ebg-green-1s>rounded-fullflexitems-ceter justfy-cenrmx-uo mb-6">
        <CheckCircle // Log activ-10 hi10tetgreen600 />
          </div  try {
           t2se.rpc('log_text-3xt fovttbo'd t, t-black{b4">
            ¡Cua cradaexitoment!
          </h>
          <pclassName=" mb-8">
           Rdiigindo a u dashoard...
          </p>
          <div cassNe="flexjufyente
             Luadrr2d: data.user.i8,-8 animate-spin textblack
           /divc
      'g,div
        d vmetadata: { method: 'email' }
    );          });
  }

  return (
    } catch (err) {min-h-screen flx">
      {/*LftsiFr */}
      console.error('Error-1 flex logging activity:', err);px-4 s:px6 lg:px- py-12
        <div}className="max-w-mdw-fullspace-y-8">
         >
           <Link href="/" jutify-nter mb6
pntext3xlfontbold>UseMyChat<span
        // R</Link>
ed          ih2 to dashboard aftcenter tert-3x 2 seconds
        setTimCreaetuocu(nt> gra is{
          roerh2h('/dashboard');
          roup className="mt-2 text-center text-sm text-gray-600"refresh();
        },    ¿Ya t0enes cuenta?{' '};
    } catc    hLink  ref="/login"err: any) {semihovr:udline
        setErrrmInieia sssióa || 'Error al crear la cuenta');
          setLoaLinkng(false);
      }/>
          </div>

          <formm8 spce-"onSubmi={handleRgiser}>
            {error && (
              <div className="bg-red-50 border borderrd-200 rouded-lg p-4 flex isstart
      };<Alertrcl classNme="w-5 h-5 text-red-600m-3flex-hrk-0m-0.5" />
                <p classNme="tx-smtext-re-800">{rr}</p>
    div
            )}  if (success) {

    return <v4
      <div c  lassName="min-h-screen bg-white flex items-center justify-center px-4">
        <div c  lassNamhtmlFor="fullName" e="max-w-md w-full text-center">gry-700
          <div c  lassName="w-16  *h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <C  heckCircle className="w-10 h-10 text-green-600" />
          </di  v>
          <h2 cl  assName="text-3xl font-bold text-black mb-4">
            ¡Cue  nta creada exitosamente!
          </h2>  idfullNam
          <p class  Name="fullNext-gray-600 mb-8">
            Rediri  type="text"
                    required
                    giendo a tu dashfullNoard...
          </p>  
          <div cla  ssName="flepl-10 x justipx-4 py-3r">fous:in2rgblacktransprental
              <Loader2 className="w-8 h-8 animate-spin text-black" />
div>        </div>
    );/iv
  }
  return (
    <div cla  ssName="min-h-screen bg-white flex">
      {/* Left   side -htmlFor="email"  Form */}gry-700
      <div class  Name= *"flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <div c  lassName="max-w-md w-full space-y-8">
          <div  >
            <Lin  k href="/" className="flex items-center justify-center mb-6">
              <s  pan className="text-3xl font-bold text-black">UseMyChat</span>
            </Link  id="email"
                    name="email"
                    >
            <h2 cl  sutoCosplNteame="text-center text-3xl font-bold text-black">
              Crea  required
                     tu cuenta gratis
            </h2>  
            <p cla  ssName="mt-pl-10 2 text-pxn4 py-3ext-sm text-gray-600">fous:in2rgblacktransprental
                ¿Ya tienes cuenta?{' 'il
                  />
              <L<idivnk href="/login" className="font-semibold text-black hover:underline">
                div>

              <Inicia sesión
                <lab/l htmlFoi="company" className="blnck text->m font-mdiu text-gry-700 mb-2">
                  Empresa (opcona)
              </label>
            </p>divrelative">
                  <Building classNae="absolue left3 top-/2ransform -translat-y-1/2 w-5 h-5 tegray-400" />
                  <input
                    id="copany"
                   name="company"
                    yp="te"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py3 bodr borer-gray2 roundd-lg focus:ing-2 focus:ing-black focus:brder-tanparnt trnsiton-all"
                    placehoder="Mi Empresa S.A."
                  
            </di</div>
  
          <form className="mt-8 space-y-6" onSubmit={handleRegister}>
              {error && (
                <div l htmcFor="password"lassName="bg-red-50 border border-red-200 rgrny-700d-lg p-4 flex items-start">
                  ConteasrñC *ircle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}Lock
  
                    id="password"
                    name="password"
        <div c      lassNapasswordspace-y-4">
              <div  utoCopltenew-ssword
                <l  required
                    abel htmlFor="fuamssword className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo *
                </  label>pl-10 px4py-3 fcus:in2rgblacktrnsparental
                  <div className"••••••••=
e>                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <i
                    name="fullName"xgay5Mínimo 6 caracte
                      required
                    value={formData.fullName}
                      onChange={handleChange}
                     l htm For="confirmPassword"className="pl-10 w-full px-4 py-3 border bogrey-700gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                   onfirmar c   placeh *older="Juan Pérez"
                    />
                  </div>
                </div>
  
                    id="confirmPassword"
                    name="confirmPassword"
                <div>
                <l  butoCoepllte hnew-tmlFor="e
                    requiredmail" className="block text-sm font-medium text-gray-700 mb-2">
                    Email *confirmP
                  </label>
                  <div classNampl-10 e="rel px-4 py-3atorder border-gray-200 rounded-lg focus:ring-2 focus:rinivblack focus:border-transparent transition-all"
                    place"older="••••••••"
                  />
                </div>
              </div>
            </div>

            <d>v className="flex ims-start">
             <input
                id="terms"
                name="terms"
                type="checkx"
                equire
                classNam="h-4 w-4 text-black focus:ing-black3 mt1"
              />
              <abelhtmFor="terms" className="ml2 block text-sm text-gray-70">
               Aceto los{' '}
                <Link hef="/terminos" className="fontsemiboldtext-black hover:underline">
                  Términos  Condiciones
                </Link>{' '}
                y la{' '}
                <Link href="/privacidad" className="fontsemiboldhover:underline">
                  Política de Privacidad
                </Link>
              </label>
            </div>

            <button
              tye="submit"
              disabled={loading}
              cassNme="w-full flex justify-center items-enter py-3 px-4 border border-transparent roundd-lg sadow-sm text-sm font-semib text-white bg-black hov:bg8ring-2 fcus:ing-offst-2 focus:ing-all disabled:opacity50 disabled:ursor-not-allwed"
            >
              {oading ? (
                <>
                  <Lade2 className="animate-pin -ml-1 mr-2 h-5 w-5 />
                  Creando cuenta...
                </>
              ) : (
                'Crear Cuenta Gratis'
              )}
            </button>

            << cMassName="text-ienter text-xs text-gray-500">
              14 días de prueba gratis • No se requiere tarjeta dl crédito
            </p>
          </fcrm>

          <div className="mt-6">
            <aiv classNams="selative">
              <div classNameNaabsolute inset-0 flex items-centerl>ute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <div className="w-full border-t border-gray-200"   <input
                    id="email"
              <div classNam =" elative flex justify-cente  text-nm">
                <smen cla="Name="px-2 bg-ehite text-gray-500">O regístrate cmn</span>
              </div>
            </div>

            <div className="mt-6 grid gaii-cols-2 gap-3">
            l<button
                ty e="button"
                 type="emaiw-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-lg shadow-sl bg-whi"em font-mediut-gray-700 hover:bg-gray-50 transiion-all"
              >
                <svg className="w5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="curntColor"
                    ="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c.2 1.37-1.4 2.53-2.21 3.31v2.77h3.57c2.8-1.92 3.28-4.74 3.28-8.09z
                  /
                  <path
                    fill="currntColo"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="curentClo"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12.43 3.45 1.18 4.93l2.85-2.22.81-62z"
                  />
                  <th
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </vg>
              </button>

              <button
                type="button"
                clasName="-full inline-flex justify-center py-3 px-4 ber border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                svg
              </button>    autoComplete="email"
                    required
          </div>                    value={formData.email}
        </div>
       /    

      {/* Right side - Benefits */}   onChange={handleChange}
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-gray-900 to-gray-700">
         div c assName="  solute inset-0 flex items-center justify-cent r p-12">
          <div c assName="max-w-md text-white">
            <h2className="ptext-4xl font-lo-d mb-6">
              Comienza gratis h1y
            </h2>
            <p 0lassName="text-xlw-ful-gray-300 mbl8">
              Únete a mile  de eppresasxque ya están trans-4rma do su comunicación con UseMyChap.
            </p>
            <div className="spaceyy-6">
              <div classNa-3="flex items-start">
                < iv className="w-12 h-12 bg-whbte/10 roonded-lg flex iters-centerdjustify-ceneer mr-4 flr -shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="bextolg font-semirold mb-1">14 días gratis</h3>
                  <p className="text-gray-300">Sin tarjeta de crédito requerida</p>
                </div>
              </div>
              <div className="flex items-start">
                <div cdassNeme="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-renter mr-4 flex-shrin--0">
                 g<CheckCircle classNare="w-6 hy62 />
                </div00 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                <div>
                  <h3 className="text-lg font-semibold mb-1">    iguración en mpnutos</h3>
                  <p className="text-glay-300">Coaienzc a usaehla plataflrma idmediaeamente</p>
                </div>
              </div>
              <div cl=s"Name="flex ittms-st@rt">email.com"
                 div c assN me="w-12 h-12 /g-white/10 rounded-lg flex items-center justify-c>nter mr-4 fex-shrink-0"
                   CheckCircle className="w-6 h-6" />
                </ </>
d               <div>
                  <h3 iv>text-lg font-semibold mb-1">Sopot dedicado</h3>
                  <p cassName="text-gry-300">Nuestro equipo e ayuda en cada paso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </d
  );
}
              </div>

              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Empresa (opcional)
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="Mi Empresa S.A."
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">Mínimo 6 caracteres</p>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirmar contraseña *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                Acepto los{' '}
                <Link href="/terminos" className="font-semibold text-black hover:underline">
                  Términos y Condiciones
                </Link>{' '}
                y la{' '}
                <Link href="/privacidad" className="font-semibold text-black hover:underline">
                  Política de Privacidad
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Creando cuenta...
                </>
              ) : (
                'Crear Cuenta Gratis'
              )}
            </button>

            <p className="text-center text-xs text-gray-500">
              14 días de prueba gratis • No se requiere tarjeta de crédito
            </p>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O regístrate con</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="w-full inline-flex justify-center py-3 px-4 border border-gray-200 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Benefits */}
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-4xl font-bold mb-6">
              Comienza gratis hoy
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Únete a miles de empresas que ya están transformando su comunicación con UseMyChat.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">14 días gratis</h3>
                  <p className="text-gray-300">Sin tarjeta de crédito requerida</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Configuración en minutos</h3>
                  <p className="text-gray-300">Comienza a usar la plataforma inmediatamente</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Soporte dedicado</h3>
                  <p className="text-gray-300">Nuestro equipo te ayuda en cada paso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-3 text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>

            <div className="flex items-start">
              <input type="checkbox" className="w-4 h-4 mt-1 rounded border-gray-300 text-black focus:ring-black" required />
              <span className="ml-2 text-sm text-gray-600">
                Acepto los{' '}
                <a href="#" className="text-black hover:underline">términos y condiciones</a>
                {' '}y la{' '}
                <a href="#" className="text-black hover:underline">política de privacidad</a>
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
            >
              Crear cuenta
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta?{' '}
              <Link href="/login" className="text-black hover:underline font-semibold transition-colors">
                Inicia sesión
              </Link>
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-center text-sm text-gray-600 mb-4">O regístrate con</p>
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg py-3 text-black hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Google</span>
              </button>
              <button className="flex items-center justify-center space-x-2 bg-white border border-gray-200 rounded-lg py-3 text-black hover:bg-gray-50 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
