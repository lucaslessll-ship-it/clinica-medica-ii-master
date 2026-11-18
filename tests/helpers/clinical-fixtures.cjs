// Imagens sintéticas usadas APENAS nos testes. Nenhum exame de paciente é copiado.
function clinicalFixtures(){
 const groups={pocus_m4:['s_l_alines','s_l_blines','s_l_seashore','s_l_barcode','s_p_simple','s_p_septated'],pocus_m5:['s_f_ruq_n','s_f_ruq_ff','s_f_pel_n','s_pe_small'],pocus_m6:['s_h_sub4c','s_pe_circ','s_h_plax','s_h_psax','s_v_long','s_v_mmode'],pocus_m7:['pocus_ij'],pocus_m11:['s_k_cyst','s_k_normal','s_k_stone'],pocus_m12:['s_d_cfv']};
 Object.assign(groups,{rad_m2:['rad_pa','rad_lat'],rad_m3:['rad_consol','rad_derrame','rad_pneumo','rad_hamman'],rad_m4:['rad_ca_pa','rad_ca_perfil','rad_ca_tc'],rad_m5:['rad_abd_colon'],rad_m6:['rad_apend_ax','rad_apend_cor'],rad_m7:['rad_pelve','rad_iliofemoral','rad_punho','rad_joelhos','rad_torn_ap','rad_torn_perfil'],rad_m8:['rad_cervical','rad_cerv_linhas','rad_femur_fx'],rad_m9:['rad_mm_cranio','rad_mm_pelve']});
 const canvas=document.createElement('canvas');canvas.width=600;canvas.height=400;canvas.getContext('2d').fillRect(0,0,600,400);
 const data=canvas.toDataURL('image/png').split(',')[1];
 window.clinicalTestRows=Object.entries(groups).flatMap(([key,ids])=>ids.map(id=>({id,keys:[key],caption:'Exemplo sintético de teste '+id,credit:'Fixture — não é exame clínico',mime:'image/png',data,marks:[]})));
}
module.exports={clinicalFixtures};
