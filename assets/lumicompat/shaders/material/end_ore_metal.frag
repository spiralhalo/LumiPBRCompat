#include lumi:shaders/lib/bump.glsl
#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumi:shaders/lib/apply_bump.glsl

/******************************************************
  lumicompat:shaders/material/end_ore_metal.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
#ifdef LUMI_PBR
  pbr_roughness = 0.7;
  vec3 c = data.spriteColor.rgb;
  if (c.r * c.g < 0.5 || c.b > c.g) {
    pbr_roughness = 0.5;
    pbr_metallic = 1.0;
  }
#endif
#ifdef LUMI_BUMP
#ifdef LUMI_BUMP_MINERALS
  _applyBump(data);  
  // data.spriteColor.rgb *= (data.vertexNormal + 1) * 0.5;
#endif
#endif
}
