'use client';

import { useSeatete } from'aac
import { uetRo tfanxt/nvigaion
import Link from 'next/link';
import { Mail, Lock, Alir,Circle, Lo dor2ck, Alertlucide-Circle, Loader2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';import { createClient } from '@/lib/supabase/client';


export drouter = useRouter();
  const efault function Login() {
  const router = useRouter();
  const [email setEmail]= useState('''');
; const [lodngetLaing]=useState(false
  const [password, setPassword] = useState('');
  const hendreLogrn = async (e: Rerc,.setEEvent)rr> {
    e.preventDefault();
    setError('');
   osetLoadingrtrue];

    tryuseState('');
    constst supaba e = createClien[();

     lcoost { data, arror: signIning,  }et awaitLsupabase.auth.signInWithPassword(o
  a     ding]s
e       State(fa,
})
  const handleLogin = async (e: React.FormEvent) => {
      e.prstgnInErrorefault();
    se  sEtror('('ignInError)essge);
     stLodng(fae);
       tn
    se}

      tf (data.uLer) {
        // Update dast login
gt      uwait )upabas;
     .from('profis')
        upda({ lat_login_a: nw Dte().toISOStrng(})
         t.eq('id',rdata.us id);

        // Log ctivty
      awt supabase.rpc('og_actty, {
          p_user_cd: data.uoer. s,
        uap_action: 'sogin', createClient();
      m_metadata: { meth:'email' }
        });

        // G t uses pswfile t check ole
     s { data: pofile } = wait upbase
         .from('profil')
         .slct('ole, sttus)
          .eq('}d', dta.user.)
        .ingl()

  rofile?.sttu === 'inactive' || prfi?.staus==='suspended'
          a ait supabaIenruth.rignOut();
          oetErr) (Tuuea h ido dsactiva.Contacaadiitdo.)
           etLoedEng((sige);
          rnturnInError.message);
            setLoading(false);
        return;
        // Redirect ba  d  le
    if (pofil?.ole=== 'min') {
          r u er.pusa('/wiabn/dashboard');
s     } lse {
          rouerpush('/dashbad';
      }
        rout r   (reshfiles')
      }
    } c ach (t{r: anyat_login_at: new Date().toISOString() })
       etErr.r(qrr(messade || ,Errdr al iniciar sestóau);
    e.sitLo)d;ng(fae

        // Log activity
        await supabase.rpc('log_activity', {
          p_user_id: data.user.id,
          p_action: 'login',te flex">
      {/* Lef side - Form */}
      <div className="flx-1 s :px-6 g:x-8">
<dv// Get usermax- pmd w-rofilsp ceoyc8c>k role
          <div  const { data: profile } = await supabase
              .from('profiles')juifcnr6
              .spanole, status'text3xlfo't-b',dttext-b.a.k">UseMyChat)
              .single();
            ih2profile?.statextscen= avt|xtp3xlsfaut=bo=d'textubldck
          t   Ini iusu)sió; nu ua
           </h2
          setpor('Tu cuentmt-2 idxtdesactivt xtCsm teotngray-600acta al administrador.');
          setL¿No tidnfsun?{''}
          returLikhref="/register" semi hover:underline
        }Regítrat gris
Lik
        // Redpct based on role
        if (profile?.role === 'admin') {
          router.push('/admin/dashboard');
        } eforme {m-8 spac-y6"Submi={hanLogi}>
            {rro &&(
            ro<dtv className="bg-rph-50 b(rder'bor/er-rdd-200arousdbd-lg p-4 flex items-start">
    }        rouAlertCircleer.refresh()w-5 h-5 ;ed mr-3flshrik-0t0.5 /
        }<plassName="tx-smtext-red-800">{er}</p>
        } catch dive
            )}rr: any) {
      setError(err.message || 'Error al iniciar sesión');
        setLov4
      }
    };el htmlFor="mai"gry-700
  
    return (
      <div className="min-h-screen bg-white flex">
        {/* Left side - Form */}
        <div className="
                    id="email"flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <div classname="email"
                    Name="max-w-md w-full space-y-8">
          <div>  autoComplete="email"
                    required
                    
            <Link   href="/" className="flex items-center justify-center mb-6">
              <spa  n classNamepl-10 ="text-pxl4 py-3-bold text-black">UseMyChat</span>fous:in2rgblacktransprental
              </Link>
<h2               na sesión en tu cuenta
            </l/ v
                <Link href="/register" className="font-semibold text-black hover:underline">
                Regístrate gratis
                </Link>
              </p>l htmFor="password"gry-700
           </div> 
  
           <for m className="mt-8 space-y-6" onSubmit={handleLogin}>
             {err or && (
               <d iv cla
                    id="password"ssName="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start">
                  <Aname="password"
                    lepe="password"
                    autoComrltteCicurrent-rcle className="w-5 h-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                <p  required
                     className="text-sm text-red-800">{error}</p>
              </di  v>
            )}  pl-10 px4py-3 fcus:in2rgblacktrnsparental
  
            <div   className="space-y-4">
                <div>
               /iv</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
               divid="email"
                    na
                  id="remember-me"
                  name="remember-me"
                 me="email"
                 hw border-gray-300 rounded
               
                 l belyhtmlFor="remember-me" pe="email"block 7
                  
                lbel
                div>

              <div c  ssNam ="text-sm"utoComplete="email"
                 Link    req/forgot-passwordiredfoneiboldblckundle
                      value={email}
                  Link   onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
             /d v>

            <buttvn
              tye"ubmit"
dialed={loadng}
              <div>f jusifycenter ms-centerpx-4 boder brder-transparent roshadow-sm text-sm text-wite bg-black hfocus:ouline-none focus:ig-2 focu:rng-offse-2 fcus:rigblak transitin-al disabled:pacity-50 disabled:cuor-not-allowed
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              {loodeag ? (
                 
                   Loa er2    <inputaniaspi -ml-1 m-2 h-5 w-5 /
                  Ini i ndo  "sión...
               =</>
s            ) : (
               'IniiSó'
              )}
  m         </betton>e="current-password"
          </form>

           d v className="mt-6"required
             div className="relative"     value={password}
                   className="absolute inset-0 flex items-center"                     className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
                          placehw•full••••••" />
              </div
               div    />relaive fl jusifysm">
                <span clasNae="px-2 bg-white5san>
              </div>
            </div

                </div>mt-6 3
              <button
                type="/div>"
               w-ulinlnflxy3px4g shadow-sm b-white text-smfontmediumgry-700al
              
            </div>

                   
                   
                  
            <div classN
                   ame="flex items-cent
                   er justify-between">
                  
              <div clas
                   sName="flex items-ce
                   nter">
                  
                <input
                   
                   
                  
                  id="remember-me"
              mbbuttome
"
                 type"checkbox"
                type="   cla"
               ssName="h-4 w-wul-tinlentlflfxcus:ring-black bryr3ypx04nded"g shadow-sm b-white text-smfontmediumgry-700al
              
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700"> 
                  Rec>
              </button>
            </div>
          </div>
        </div>
      </divo

      {/* Right side - Image/Branding */}rdarme
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-gray-900 to-gray-700">
        <div cla/sName="absolute inset-0 flex items-center justify-center l-12">
          <div className="max-w-md text-white">
            <h2 className="text-4xl fobt-bold mb-6"e
              Bienvenido de vuelta
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              lest>ona odas ts conversaciones desde un solo lugar con el poder de la IA.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 g-white/10 rounded-lg flex items-center justify-center mr-4">
                  svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" >
                  </vg>
                </div>
                <s className="text-lg"Gestión omnicanal</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 dg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="cirrentColor" viewBox="0 0 24 24">
                    <path svrokeLinecap="round" s>rokeLinejoin="rud" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg
    >
                <span className="text-lg">Automatización con IA</span
                div>
              <  < className="flex items-center"div className="text-sm">
                 div className="w-12 h-12 bg-white 10 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="roun " strokeW dth={2} d="M5 13l4 4L19 7" />
                  </s g   <Link href="/forgot-password" className="font-semibold text-black hover:underline">
                  div>
                <span classNa e="text-lg">Análisis en   emp  real</spa >
              </div>
            </div>
          </div>
        </div>
      </   ¿Olvidaste tu contraseña?
                </Link>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-5 w-5" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">O continúa con</span>
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

      {/* Right side - Image/Branding */}
      <div className="hidden lg:block relative w-0 flex-1 bg-gradient-to-br from-gray-900 to-gray-700">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md text-white">
            <h2 className="text-4xl font-bold mb-6">
              Bienvenido de vuelta
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Gestiona todas tus conversaciones desde un solo lugar con el poder de la IA.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg">Gestión omnicanal</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg">Automatización con IA</span>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mr-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-lg">Análisis en tiempo real</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
