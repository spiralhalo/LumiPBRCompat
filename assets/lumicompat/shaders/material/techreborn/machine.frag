#include lumiext:shaders/lib/bump.glsl
#include frex:shaders/api/sampler.glsl
#include frex:shaders/api/fragment.glsl
#include lumiext:shaders/internal/frag.glsl

/*****************************************************
  lumicompat:shaders/material/techreborn/machine.frag
******************************************************/

void frx_startFragment(inout frx_FragmentData data) 
{
  vec3 c = data.spriteColor.rgb;
  float min_ = min( min(c.r, c.g), c.b );
  float max_ = max( max(c.r, c.g), c.b );
  float s = max_ > 0 ? (max_ - min_) / max_ : 0;
  data.emissivity = smoothstep(0.3, 0.5, s);

#ifdef LUMI_PBRX
  float l = frx_luminance(c);
  if (l >= 0.25) {
    pbr_metallic = frx_smootherstep(0.5, 0.25, s) * (1.0 - l);
    pbr_roughness = 0.5;
  } else {
    pbr_roughness = 0.1;
  }
#endif

#ifdef LUMI_BUMP
#ifdef LUMIEXT_ApplyBumpDefault
  _applyBump(data);
#endif
#endif

}
