import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ResultadoSolicitud{
    estado: string;
    resultado: string;
    descripcionResultado: string;
}

export default function ResultadoSolicitud({ estado, resultado, descripcionResultado }:ResultadoSolicitud){
    return (
        <div className='space-y-6'>
            <div className='space-y-2'>
                <Label htmlFor='estadoSolicitud' className='text-slate-800 font-medium'>
                    Estado Solicitud
                </Label>
                <Input
                id='estadoSolicitud'
                type='text'
                value={estado}
                className="bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                disabled={true}
                />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='resultado' className='text-slate-800 font-medium'>
                    Resultado
                </Label>
                <Input
                    id='resultado'
                    type='text'
                    value={resultado}
                    className='bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20'
                    disabled={true}
                />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='descripcionResultado' className='text-slate-800 font-medium'>
                    Descripción Resultado
                </Label>
                <Textarea
                    id='descripcionResultado'
                    value={descripcionResultado}
                    className='bg-white border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20 min-h-20'
                    disabled={true}
                />
            </div>
        </div>
    );
}